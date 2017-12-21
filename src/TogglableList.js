import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

function TogglableListItem (props) {
  return (
    <Table.Row onClick={props.onClick}>
      <Table.Cell width={13}>
        {props.name}
      </Table.Cell>
      <Table.Cell width={3}>
        <Checkbox toggle checked={props.checked} />
      </Table.Cell>
    </Table.Row>
  );
}

function TogglableList (props) {
  function toggleItem (item) {
    item.checked = !item.checked;
    return item;
  }

  const listItems = props.items.map((item, index) => (
    <TogglableListItem key={item.id} name={item.name} checked={item.checked} onClick={e => props.handleItemChange(index, toggleItem(item))} />
  ));
  return (
    <Table attached selectable striped size='large'>
      <Table.Body>
        {listItems}
      </Table.Body>
    </Table>
  );
}

export default TogglableList;
