import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

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

export { CelledPanelHeader, CelledPanelSegment };
