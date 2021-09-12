import { DoomFetch } from './src/mod.ts';
import type { Methods } from './src/types.ts';
export * from './src/types.ts';
export * from './src/compressions.ts';
function doomFetch<T>(url: string | URL, method?: Methods) {
	return new DoomFetch<T>(url, method);
}

export { DoomFetch, doomFetch };
