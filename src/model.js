import Shortid from 'shortid';
import { decodeParams, encodeParams } from './url';

function checkedItems (items) {
  return items.filter(item => item.checked);
}

function createItems (location) {
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

function urlSearchString (roles, users) {
  const paramArray = [
    ...roles.map(role => ['role', role.value]),
    ...users.map(user => ['user', user.value])
  ];
  return encodeParams(paramArray);
}

function normalizeItem (item) {
  if (!item.id) {
    item.id = Shortid.generate();
  }
}

export { checkedItems, createItems, normalizeItem, urlSearchString };
