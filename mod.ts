import { DoomFetch } from './src/mod.ts';
import type { Methods, Urls } from './src/types.ts';
export * from './src/types.ts';
export * from './src/compressions.ts';
function doomFetch<T>(url: Urls, method?: Methods) {
	return new DoomFetch<T>(url, method);
}

export { DoomFetch, doomFetch };
export default doomFetch;
