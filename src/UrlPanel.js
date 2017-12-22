import React from 'react';
import { Button, Header, Input } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

function UrlPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' content='現在のデータのURL' dividing size='small' icon='linkify' />
      <Input action fluid value={props.value} onClick={e => e.target.select()}>
        <input />
        <Button color='teal' content='コピー' icon='copy' labelPosition='right' onClick={e => copy(props.value)} />
      </Input>
    </React.Fragment>
  );
}

export default UrlPanel;
