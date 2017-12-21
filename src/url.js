function decodeParams (location, keys) {
  const params = new URL(location).searchParams;
  const out = {};
  for (const key of keys) {
    out[key + 's'] = params.getAll(key);
  }
  return out;
}

function encodeParams (location, init) {
  const params = new URLSearchParams(init);
  const url = new URL('?' + params.toString(), location.origin);
  return url.toString();
}

export { decodeParams, encodeParams };
