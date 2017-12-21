import React from 'react';
import { Table } from 'semantic-ui-react';

function AssignmentsListItem (props) {
  return (
    <Table.Row className='AssignmentsListItem'>
      <Table.Cell>
        {props.userName} さん
      </Table.Cell>
      <Table.Cell>
        {props.roleName}
      </Table.Cell>
    </Table.Row>
  );
}

function AssignmentsList (props) {
  if (props.items.length === 0) {
    return null;
  }

  const listItems = props.items.map((item, index) => (
    <AssignmentsListItem key={item.id} userName={item.value} roleName={item.assignment ? item.assignment.value : ''} />
  ));
  return (
    <Table attached celled striped size='large'>
      <Table.Body>
        {listItems}
      </Table.Body>
    </Table>
  );
}

export default AssignmentsList;
