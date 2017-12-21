import Shortid from 'shortid';
import { decodeParams, encodeParams } from './url';

function checkedItems (items) {
  return items.filter(item => item.checked);
}

function decodeItems (location) {
  const params = decodeParams(location, ['role', 'user']);
  const out = {};
  for (const [key, values] of Object.entries(params)) {
    out[key] = values.map(value => ({
      value,
      id: Shortid.generate()
    }));
  }
  return out;
}

function encodeItems (location, roles, users) {
  const paramArray = [
    ...roles.map(role => ['role', role.value]),
    ...users.map(user => ['user', user.value])
  ];
  return encodeParams(location, paramArray);
}

function normalizeItem (item) {
  if (!item.id) {
    item.id = Shortid.generate();
  }
}

export { checkedItems, decodeItems, encodeItems, normalizeItem };
