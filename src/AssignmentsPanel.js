import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { CelledPanelHeader, CelledPanelSegment, CelledPanelTable } from './CelledPanel';

function AssignButton (props) {
  return (
    <Button.Group size='large' color={props.color || (props.assigned ? 'green' : 'blue')}>
      <Button content='実行' icon='play' disabled={!props.canAssign} onClick={props.onAssign} />
      <Button icon='repeat' disabled={!props.assigned} onClick={props.onReset} />
    </Button.Group>
  );
}

function AssignmentsListItem (props) {
  return (
    <Table.Row>
      <Table.Cell>
        {props.user} さん
      </Table.Cell>
      <Table.Cell>
        {props.role}
      </Table.Cell>
    </Table.Row>
  );
}

function AssignmentsList (props) {
  if (props.items.length === 0) {
    return null;
  }

  const listItems = props.items.map((item, index) => (
    <AssignmentsListItem key={item.id} user={item.value} role={props.assignments[item.id]} />
  ));
  return (
    <CelledPanelTable attached='bottom' celled>
      {listItems}
    </CelledPanelTable>
  );
}

class AssignmentsPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      assigned: false
    };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(this.state.assigned && nextState.assigned);
  }

  assign () {
    this.props.assign();
    this.setState({ assigned: true });
  }

  reset () {
    this.props.reset();
    this.setState({ assigned: false });
  }

  render () {
    return (
      <React.Fragment>
        <CelledPanelHeader content='割り当て' icon='shuffle' />
        <CelledPanelSegment attached={(this.props.items.length === 0) ? 'bottom' : undefined}>
          <AssignButton
            assigned={this.state.assigned}
            canAssign={this.props.canAssign && !this.state.assigned}
            color={this.props.error ? 'red' : undefined}
            onAssign={this.assign.bind(this)}
            onReset={this.reset.bind(this)}
          />
        </CelledPanelSegment>
        <AssignmentsList items={this.props.items} assignments={this.props.assignments} />
      </React.Fragment>
    );
  }
}

export default AssignmentsPanel;
