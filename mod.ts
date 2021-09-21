import { DoomFetch } from './src/mod.ts';
import type { Methods, Urls } from './src/types.ts';
export * from './src/types.ts';
/**
 * https://doc.deno.land/https/deno.land/x/doomfetch/mod.ts#DoomFetch
 */
// deno-lint-ignore no-explicit-any
function doomFetch<T = any>(url: Urls, method?: Methods) {
	return new DoomFetch<T>(url, method);
}

export { DoomFetch, doomFetch };
export default doomFetch;
