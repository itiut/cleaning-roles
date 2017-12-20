import React from 'react';
import { Table } from 'semantic-ui-react';
import './AssignmentsList.css';

function AssignmentsListItem (props) {
  return (
    <Table.Row className='AssignmentsListItem'>
      <Table.Cell>
        {props.userName}
      </Table.Cell>
      <Table.Cell>
        {props.roleName}
      </Table.Cell>
    </Table.Row>
  );
}

function AssignmentsList (props) {
  if (props.items.length <= 0) {
    return null;
  }
  const listItems = props.items.map((item, index) => (
    <AssignmentsListItem key={item.id} userName={item.name} roleName={item.assignment ? item.assignment.name : ''} />
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
