import React from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';

function CelledPanelHeader (props) {
  return <Header as='h2' attached='top' {...props} />;
}

function CelledPanelSegment (props) {
  return (
    <Segment attached textAlign='center'>
      {props.children}
    </Segment>
  );
}

function CelledPanelTable ({ celled, selectable, ...props }) {
  return (
    <Table attached size='large' striped { ...{ celled, selectable }}>
      <Table.Body>
        {props.children}
      </Table.Body>
    </Table>
  );
}

export { CelledPanelHeader, CelledPanelSegment, CelledPanelTable };
