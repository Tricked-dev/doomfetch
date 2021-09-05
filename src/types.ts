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

//This interface is needed to fix headers thing
export interface FixedRequest extends Omit<RequestInit, 'headers' | "method"> {
	headers: Record<string, string>;
	method?: Methods
}
/**
 * A useful type to change the return type
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
 */
export type BodyData<T extends keyof BodyTypes<V>, V> = Body<T, V>;
/**
 * Returns body type with the right json body
 */
export interface Body<T extends keyof BodyTypes<V>, V>
	extends Omit<Response, 'body'> {
	readonly body: BodyTypes<V>[T];
}
