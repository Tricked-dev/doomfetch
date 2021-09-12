import { CompressionObject } from './types.ts';
export let compressions: CompressionObject = {};
export function setCompressions(compression: CompressionObject) {
	compressions = {
		...compression,
	};
	return compression;
}
