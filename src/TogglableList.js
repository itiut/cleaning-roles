import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';
import { CelledPanelTable } from './CelledPanel';

function TogglableListItem (props) {
  return (
    <Table.Row onClick={props.onClick}>
      <Table.Cell width={1} textAlign='center'>
        {props.index}.
      </Table.Cell>
      <Table.Cell width={14}>
        {props.value}{props.label ? ` ${props.label}` : null}
      </Table.Cell>
      <Table.Cell textAlign='right' width={1}>
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
      index={index + 1}
      label={props.label}
      onClick={e => props.changeItem(index, { checked: !item.checked })} />
  ));
  return (
    <CelledPanelTable selectable>
      {listItems}
    </CelledPanelTable>
  );
}

export default TogglableList;
