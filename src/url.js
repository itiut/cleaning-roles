function normalizeValues (values) {
  return values.map(value => value.trim()).filter(value => value.length > 0);
}

function decodeParams (location, keys) {
  const params = new URLSearchParams(location.search);
  const out = {};
  for (const key of keys) {
    out[key] = normalizeValues(params.getAll(key));
  }
  return out;
}

function normalizeKvPairs (pairs) {
  for (const pair of pairs) {
    pair[1] = pair[1].trim();
  }
  return pairs.filter(pair => pair[1].length > 0);
}

function encodeParams (location, kvPairs) {
  const params = new URLSearchParams(normalizeKvPairs(kvPairs));
  const url = new URL('?' + params.toString(), location.origin + location.pathname);
  return url.toString();
}

export { decodeParams, encodeParams };
