function decodeParams (location, keys) {
  const params = new URLSearchParams(location.search.slice(1));
  const out = {};
  for (const key of keys) {
    out[key + 's'] = params.getAll(key);
  }
  return out;
}

function encodeParams (init) {
  return new URLSearchParams(init);
}

export { decodeParams, encodeParams };
