export type Methods =
	| 'GET'
	| 'get'
	| 'POST'
	| 'post'
	| 'PUT'
	| 'put'
	| 'PATCH'
	| 'patch'
	| 'DELETE'
	| 'delete'
	| 'HEAD'
	| 'head';

/**
 * Request edited to work better with doomfetch
 * 
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#FixedRequest
 */
export interface FixedRequest extends Omit<RequestInit, 'headers' | "method"> {
	headers: Record<string, string>;
	method?: Methods
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
