import React from 'react';
import { Header, Input } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

function UrlPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' content='現在の設定のURL' dividing size='small' icon='linkify' />
      <Input
        action={{
          color: 'teal',
          content: 'コピー',
          icon: 'copy',
          labelPosition: 'right',
          onClick: e => copy(props.value)
        }}
        fluid
        value={props.value}
        onClick={e => e.target.select()}
      />
    </React.Fragment>
  );
}

export default UrlPanel;
