import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export const COMPRESSION_METHODS = {
  LZ: "lz",
  GZIP: "gzip",
  NONE: "none",
};

export async function encode(data: unknown, method = COMPRESSION_METHODS.LZ) {
  const jsonStr = JSON.stringify(data);
  if (method === COMPRESSION_METHODS.NONE) {
    return encodeURIComponent(jsonStr);
  }
  if (method === COMPRESSION_METHODS.LZ) {
    return compressToEncodedURIComponent(jsonStr);
  }
  const stream = new CompressionStream("gzip");
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  writer.write(new TextEncoder().encode(jsonStr));
  writer.close();

  const chunks = [];
  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) chunks.push(value);
  }

  const compressed = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0),
  );
  let offset = 0;
  for (const chunk of chunks) {
    compressed.set(chunk, offset);
    offset += chunk.length;
  }

  // Convert to base64 and URL encode
  const b64 = btoa(String.fromCharCode(...compressed));
  return encodeURIComponent(b64);
}

export async function decode(
  encodedStr: string,
  method = COMPRESSION_METHODS.LZ,
) {
  if (method === COMPRESSION_METHODS.NONE) {
    return decodeURIComponent(encodedStr);
  }
  if (method === COMPRESSION_METHODS.LZ) {
    return decompressFromEncodedURIComponent(encodedStr);
  }
  const b64 = decodeURIComponent(encodedStr);
  const compressed = new Uint8Array(
    atob(b64)
      .split("")
      .map((c) => c.charCodeAt(0)),
  );

  const stream = new DecompressionStream("gzip");
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  writer.write(compressed);
  writer.close();

  const chunks = [];
  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) chunks.push(value);
  }

  const decompressed = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0),
  );
  let offset = 0;
  for (const chunk of chunks) {
    decompressed.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(decompressed);
}
