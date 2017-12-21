function normalizeValues (values) {
  return values.map(value => value.trim()).filter(value => value.length > 0);
}

function decodeParams (location, keys) {
  const params = new URLSearchParams(location.search);
  const out = {};
  for (const key of keys) {
    out[key + 's'] = normalizeValues(params.getAll(key));
  }
  return out;
}

function normalizeValuePairs (pairs) {
  pairs.forEach(pair => pair[1] = pair[1].trim());
  return pairs.filter(pair => pair[1].length > 0);
}

function encodeParams (location, valuePairs) {
  const params = new URLSearchParams(normalizeValuePairs(valuePairs));
  const url = new URL('?' + params.toString(), location.origin);
  return url.toString();
}

export { decodeParams, encodeParams };
