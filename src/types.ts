type Methods =
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
interface FixedRequest extends Omit<RequestInit, 'headers'> {
	headers: Record<string, string>;
}
