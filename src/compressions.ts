type CompressionFunction = (
	t: Uint8Array,
	...extra: any[]
) => Uint8Array | Promise<Uint8Array>;
type CompressionObject = Record<string, CompressionFunction>;
export let compressions: CompressionObject = {};
export function setCompressions(compression: CompressionObject) {
	compressions = {
		...compression,
	};
	return compression;
}
