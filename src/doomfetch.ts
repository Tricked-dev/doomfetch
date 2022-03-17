//Most-Comments (C) Denoland https://github.com/denoland
import type {
	BodyTypes,
	DoomRequest,
	Methods,
	BodyData,
	PathName,
	Urls,
} from './types.ts';

/**
 * DoomFetch class documentation:
 *
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#DoomFetch
 */
export class DoomFetch<T> {
	#request: DoomRequest = {
		headers: {},
	};
	#retrylimit = 0;
	url: URL;

	constructor(url: Urls, method?: Methods) {
		this.#request.method = method;
		this.url = DoomFetch.resolveURL(url);
	}
	static get<T = any>(url: Urls) {
		return new DoomFetch<T>(url, 'GET');
	}
	static post<T = any>(url: Urls) {
		return new DoomFetch<T>(url, 'POST');
	}
	static put<T = any>(url: Urls) {
		return new DoomFetch<T>(url, 'PUT');
	}
	static patch<T = any>(url: Urls) {
		return new DoomFetch<T>(url, 'PATCH');
	}
	static head<T = any>(url: Urls) {
		return new DoomFetch<T>(url, 'HEAD');
	}
	/**
	 * Method to resolve a url out of a string/URL/Response
	 */
	static resolveURL(url: Urls) {
		return url instanceof URL
			? url
			: url instanceof Response
			? new URL(url.url)
			: new URL(url);
	}
	/**
	 * Initialize a doomFetch instance with a custom request body
	 */
	static from<T>(url: Urls, body?: DoomRequest) {
		const doomfetch = new DoomFetch<T>(url, body?.method);
		if (body) doomfetch.request = body;
		return doomfetch;
	}
	/**
	 * Set the request
	 */
	set request(i: DoomRequest) {
		this.#request = i;
	}
	/**
	 * Returns the request
	 */
	get request() {
		return this.#request;
	}
	/**
	 * Clone the current instance of DoomFetch
	 *
	 *
	 * @example
	 * const req = doomFetch("https://example.com")
	 * const req2 = req.clone().query("search", "doomfetch")
	 */
	clone = () => {
		const instance = new DoomFetch<T>(this.url, this.#request.method);
		instance.request = {
			...this.#request,
			headers: {
				...this.#request.headers,
			},
		};
		return instance;
	};
	/**
	 * Internal function used to simplify code
	 */
	#setThis(input: keyof DoomRequest, value: any) {
		this.#request[input] = value;
		return this;
	}

	/**
	 * A BodyInit object or null to set request's body.
	 */
	body = (
		body: BodyInit | Record<string | number | symbol, unknown>,
		sendAs?: 'json' | 'form'
	) => {
		if (typeof body == 'object') body = JSON.stringify(body);
		this.#request.body = body;
		if (sendAs == 'json') this.header('content-type', 'application/json');
		else if (sendAs == 'form')
			this.header('content-type', 'application/x-www-form-urlencoded');

		return this;
	};
	/**
	 * ### Attach a file as formdata this overwrites the body! unless the body is formdata already
	 *
	 * formdata: https://developer.mozilla.org/en-US/docs/Web/API/FormData
	 *
	 * ref: https://stackoverflow.com/questions/48447550/how-can-i-send-a-binary-data-blob-using-fetch-and-formdata
	 */
	file = (
		file: Blob | BufferSource | string,
		name: string,
		options?: {
			type?: string;
			asFile?: boolean;
			filename?: string;
			lastModified?: number;
			ending?: 'transparent' | 'native';
		}
	) => {
		if (options?.asFile && !(file instanceof File)) {
			file = new File([file], options?.filename || name, {
				type: options?.type,
				lastModified: options?.lastModified,
				endings: options?.ending,
			});
		} else if (!(file instanceof Blob)) {
			file = new Blob([file], { type: options?.type });
		}

		let formData =
			this.#request.body instanceof FormData
				? this.#request.body
				: new FormData();
		formData.append(name, file);
		this.#request.body = formData;
		return this;
	};
	/**
	 * Makes it so the request retries after failing ( !res.ok ) useful for unstable api's
	 */
	retry = (times: true | number = 5) => {
		if (times == true) times = 5;
		this.#retrylimit = times;
		return this;
	};
	/**
	 * A string indicating how the request will interact with the browser's cache
	 * to set request's cache.
	 */
	cache = (cache: RequestCache) => this.#setThis('cache', cache);
	/**
	 * A string indicating whether credentials will be sent with the request
	 * always, never, or only when sent to a same-origin URL. Sets request's
	 * credentials.
	 */
	credentials = (credentials: RequestCredentials) =>
		this.#setThis('credentials', credentials);
	/**
	 * Set a header use headers to set multiple headers
	 * request's headers.
	 */
	header = (key: string, value: string): this => {
		this.#request.headers[key] = value;
		return this;
	};
	/**
	 * A Headers object, an object literal, or an array of two-item arrays to set
	 * request's headers.
	 *
	 *
	 * @example
	 * .headers({
	 * 		authorization: "doomfetch",
	 * 		"content-type": "application/json"
	 * })
	 */
	headers = (input: Record<string, string>) => {
		this.#request.headers = { ...this.#request.headers, ...input };
		return this;
	};
	/**
	 * Add a query to your url use querymore to add multiple at once
	 * request's query
	 */
	query = (key: string, value: string | number) => {
		this.url.searchParams.append(key, value.toString());
		return this;
	};
	/**
	 * Add a queries to your url
	 * request's query
	 *
	 *
	 * @example
	 * .queryMore({
	 * 	 limit: "1",
	 * 	 search: "doomfetch"
	 * })
	 */
	queryMore = (input: Record<string, string>) => {
		for (const [key, value] of Object.entries(input)) {
			this.url.searchParams.append(key, value.toString());
		}
		return this;
	};
	/**
	 * A cryptographic hash of the resource to be fetched by request. Sets
	 * request's integrity.
	 */
	integrity = (integrity: string) => this.#setThis('integrity', integrity);
	/**
	 * A boolean to set request's keepalive.
	 * @ts-expect-error -
	 */
	keepAlive = (keepAlive: boolean) => this.#setThis('keepalive', keepAlive);
	/**
	 * A string to set request's method.
	 */
	method = (method: Methods) => this.#setThis('method', method);
	/**
	 * A string to indicate whether the request will use CORS, or will be
	 * restricted to same-origin URLs. Sets request's mode.
	 */
	mode = (mode: RequestMode) => this.#setThis('mode', mode);
	/**
	 * A string indicating whether request follows redirects, results in an error
	 * upon encountering a redirect, or returns the redirect (in an opaque
	 * fashion). Sets request's redirect.
	 */
	redirect = (redirect: boolean) => this.#setThis('redirect', redirect);
	/**
	 * A string whose value is a same-origin URL, "about:client", or the empty
	 * string, to set request's referrer.
	 */
	referrer = (referrer: string) => this.#setThis('referrer', referrer);
	/**
	 * A referrer policy to set request's referrerPolicy.
	 */
	referrerPolicy = (referrerPolicy: ReferrerPolicy) =>
		this.#setThis('referrerPolicy', referrerPolicy);
	/**
	 * An AbortSignal to set request's signal.
	 */
	signal = (signal: AbortSignal | null) => this.#setThis('signal', signal);
	/**
	 * Can only be null. Used to disassociate request from any Window.
	 */
	window = (bool: boolean) => {
		this.#request.window = bool ? null : window;
		return this;
	};
	/**
	 * Send the request and return the arrayBuffer response
	 */
	arrayBuffer = async () => {
		const res = await this.send();
		return res.arrayBuffer();
	};
	/**
	 * Send the request and return blob body
	 */
	blob = async () => {
		const res = await this.send();
		return res.blob();
	};
	/**
	 * Send the request and return formData body
	 */
	formData = async () => {
		const res = await this.send();
		return res.formData();
	};
	/**
	 * Send the response and return json with the returntype you set in while doing the request
	 * WARNING THIS MAY ERROR IF THE REQUEST DOESNT RETURN VALID JSON
	 */
	json = async (): Promise<T> => {
		const res = await this.send();
		return res.json();
	};
	/**
	 * Send the request and return the text response
	 */
	text = async () => {
		const res = await this.send();
		return res.text();
	};
	/**
	 * Send the request and return the normal response
	 *
	 * Use arrayBuffer, blob, formData, json, text, normal to return the response with the according body
	 *
	 * @example
	 * .send("text") //Returns a text response
	 * .send("json") //Sends a json response with the type you made when doing the request
	 */
	send = async <V extends keyof BodyTypes<T> = 'normal'>(
		bodyType?: V
	): Promise<BodyData<V, T>> => {
		const response = await fetch(this.url, this.#request);
		if (!response.ok && this.#retrylimit !== 0) {
			this.#retrylimit--;
			return this.send(bodyType);
		}

		const data = response[bodyType as keyof Omit<BodyTypes, 'normal'>]?.();
		if (!data) return response as BodyData<V, T>;

		//Hacky solution to avoid the getter
		Object.defineProperty(response, 'body', {
			value: await data,
			writable: false,
		});
		return response as BodyData<V, T>;
	};
	/**
	 * URL METHODS
	 */

	/**
	 * Set the url
	 */
	setURL = (url: Urls) => {
		this.url = DoomFetch.resolveURL(url);
		return this;
	};
	/**
	 * Set url path
	 */
	setUrlPath = (path: PathName) => {
		this.url.pathname = path;
		return this;
	};
}
/**
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#DoomFetch
 */
export const doomFetch = <T = any>(url: Urls, method?: Methods) => {
	return new DoomFetch<T>(url, method);
};
