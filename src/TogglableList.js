import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

function TogglableListItem (props) {
  return (
    <Table.Row onClick={props.onClick}>
      <Table.Cell width={13}>
        {props.value}{props.sub ? ` ${props.sub}` : null}
      </Table.Cell>
      <Table.Cell width={3}>
        <Checkbox toggle checked={props.checked} />
      </Table.Cell>
    </Table.Row>
  );
}

function TogglableList (props) {
  if (props.items.length === 0) {
    return null;
  }

  const listItems = props.items.map((item, index) => (
    <TogglableListItem
      key={item.id}
      {...item}
      sub={props.sub}
      onClick={e => props.handleItemChange(index, { ...item, checked: !item.checked })} />
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
