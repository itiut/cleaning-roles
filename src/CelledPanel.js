import React from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';

function CelledPanelHeader (props) {
  return <Header as='h2' attached='top' {...props} />;
}

function CelledPanelSegment ({ attached = true, ...props }) {
  return (
    <Segment textAlign='center' {...{ attached }}>
      {props.children}
    </Segment>
  );
}

function CelledPanelTable ({ attached = true, celled, selectable, ...props }) {
  return (
    <Table striped {...{ attached, celled, selectable }}>
      <Table.Body>
        {props.children}
      </Table.Body>
    </Table>
  );
}

export { CelledPanelHeader, CelledPanelSegment, CelledPanelTable };
