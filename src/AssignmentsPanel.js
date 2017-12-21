import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { CelledPanelHeader, CelledPanelSegment, CelledPanelTable } from './CelledPanel';

function AssignmentsListItem (props) {
  return (
    <Table.Row>
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
    <CelledPanelTable attached='bottom' celled>
      {listItems}
    </CelledPanelTable>
  );
}

function AssignmentsPanel (props) {
  return (
    <React.Fragment>
      <CelledPanelHeader content='割り当て' icon='shuffle' />
      <CelledPanelSegment attached={(props.assignments.length === 0) ? 'bottom' : undefined }>
        <Button primary size='large' disabled={!props.canAssign} onClick={props.assignHandler}>実行</Button>
      </CelledPanelSegment>
      <AssignmentsList items={props.assignments} />
    </React.Fragment>
  );
}

export default AssignmentsPanel;
