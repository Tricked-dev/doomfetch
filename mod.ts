import { DoomFetch } from './src/mod.ts';
export type { Methods, FixedRequest } from './src/types.ts';
function doomFetch<T>(url: string | URL, method: Methods) {
	return new DoomFetch<T>(url, method);
}
export { DoomFetch, doomFetch };
