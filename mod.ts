export * from './src/mod.ts';
import { doomFetch, DoomFetch } from './src/mod.ts';
const get = DoomFetch.get;
const post = DoomFetch.post;
const put = DoomFetch.put;
const patch = DoomFetch.patch;
const head = DoomFetch.head;
export { doomFetch, get, post, put, patch, head, doomFetch as default };
