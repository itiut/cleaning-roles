import React from 'react';
import { Header, Icon, Segment, Table } from 'semantic-ui-react';

function CelledPanelHeader (props) {
  return (
    <Header as='h2' attached='top'>
      <Icon name={props.icon} />
      <Header.Content>
        {props.text}
      </Header.Content>
    </Header>
  );
}

function CelledPanelSegment (props) {
  return (
    <Segment attached textAlign='center'>
      {props.children}
    </Segment>
  );
}

function CelledPanelTable (props) {
  const { celled, selectable } = props;
  return (
    <Table attached size='large' striped { ...{ celled, selectable }}>
      <Table.Body>
        {props.children}
      </Table.Body>
    </Table>
  );
}

export { CelledPanelHeader, CelledPanelSegment, CelledPanelTable };
