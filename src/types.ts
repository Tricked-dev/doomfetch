export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

/**
 * Request edited to work better with doomfetch
 *
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#FixedRequest
 */
export interface DoomRequest extends Omit<RequestInit, 'headers' | 'method'> {
	headers: Record<string, string>;
	method?: Methods;
}
/**
 * A useful type to change the return type
 *
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#BodyTypes
 */
export type BodyTypes<V = any> = {
	arrayBuffer: ArrayBuffer;
	blob: Blob;
	formData: FormData;
	json: V;
	text: string;
	normal: Response['body'];
};
/**
 * Returns body type with the right json body
 *
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#BodyTypes
 */
export type BodyData<T extends keyof BodyTypes<V>, V> = Body<T, V>;
/**
 * Returns body type with the right json body
 *
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#Body
 */
export interface Body<T extends keyof BodyTypes<V>, V>
	extends Omit<Response, 'body'> {
	readonly body: BodyTypes<V>[T];
}
/**
 * Simple type to add intellisense
 */
export type fetchSupported = 'http://' | 'https://';
/**
 * Add string type otherwise the types are going to be annoying
 */
export type fetchRequest = `${fetchSupported}${string}` | string;
/**
 * All the types of url that work for Doomfetch
 */
export type Urls = fetchRequest | URL | Response;
/**
 * Useful to stop people from making mistakes
 */
export type PathName = `/${string}` | string;
