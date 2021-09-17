//Most-Comments (C) Denoland https://github.com/denoland
import type {
	BodyTypes,
	FixedRequest,
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
	#request: FixedRequest = {
		headers: {},
	};
	url: URL;

	constructor(url: Urls, method?: Methods) {
		this.#request.method = method;
		this.url =
			url instanceof URL
				? url
				: url instanceof Response
				? new URL(url.url)
				: new URL(url);
	}

	/**
	 * Set the request
	 */
	set request(i: FixedRequest) {
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
	 * const req = doomFetch("https://google.com")
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
	#setThis(input: keyof FixedRequest, value: any) {
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
		let data;
		const response = await fetch(this.url, this.#request);

		switch (bodyType) {
			case 'arrayBuffer':
				data = response.arrayBuffer();
				break;
			case 'blob':
				data = response.blob();
				break;
			case 'formData':
				data = response.formData();
				break;
			case 'json':
				data = response.json();
				break;
			case 'text':
				data = response.text();
				break;
			default:
				return response as BodyData<V, T>;
		}

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
	setURL = (url: string | URL) => {
		this.url = url instanceof URL ? url : new URL(url);
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
