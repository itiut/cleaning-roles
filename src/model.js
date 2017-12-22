import shortid from 'shortid';
import { decodeParams, encodeParams } from './url';

function sample (array) {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

function assign (checkedUsers, checkedRoles) {
  if (checkedRoles.length > checkedUsers.length) {
    return null;
  }

  while (checkedRoles.length < checkedUsers.length) {
    checkedRoles.push({ value: '' });
  }
  const assignments = {};
  for (const user of checkedUsers) {
    assignments[user.id] = sample(checkedRoles).value;
  }
  return assignments;
}

function checkedItems (items) {
  return items.filter(item => item.checked);
}

function decodeItems (location) {
  const params = decodeParams(location, ['role', 'user']);
  const out = {};
  for (const [key, values] of Object.entries(params)) {
    out[key] = values.map(value => ({
      value,
      id: shortid.generate()
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
    item.id = shortid.generate();
  }
}

export { assign, checkedItems, decodeItems, encodeItems, normalizeItem };
