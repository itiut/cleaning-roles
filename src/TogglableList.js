import React from 'react';
import { Table } from 'semantic-ui-react';
import TogglableListItem from './TogglableListItem';

function TogglableList (props) {
  const listItems = props.items.map((item, index) => (
    <TogglableListItem key={item.id} name={item.name} checked={item.checked} onClick={e => props.toggleHandler(index)} />
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
