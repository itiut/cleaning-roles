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

export default TogglableListItem;
