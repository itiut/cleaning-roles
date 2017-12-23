import React from 'react';
import { Button, Header, Input, Modal } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';
import qrcode from 'qrcode';

class QRCodeCanvas extends React.Component {
  constructor (props) {
    super(props);
    this.canvasRef = null;
    this.state = {
      error: false
    };
  }

  componentDidMount () {
    qrcode.toCanvas(this.canvasRef, this.props.value, (err) => {
      if (err) {
        console.error(err);
        this.setState({ error: true });
      }
    });
  }

  render () {
    return (
      <React.Fragment>
        {this.state.error ? <p>QRコード生成に失敗しました。</p> : null}
        <div className='QRCodeWrapper'>
          <canvas className='QRCode' ref={canvas => this.canvasRef = canvas} />
        </div>
      </React.Fragment>
    );
  }
}

function QRCodeModal(props) {
  return (
    <Modal closeIcon trigger={props.trigger}>
      <Header content='現在のデータのURL' icon='qrcode' />
      <Modal.Content>
        <QRCodeCanvas value={props.value} />
      </Modal.Content>
    </Modal>
  );
}

function UrlPanel (props) {
  return (
    <React.Fragment>
      <Header as='h2' content='現在のデータのURL' dividing size='small' icon='linkify' />
      <Input action fluid value={props.value} onClick={e => e.target.select()}>
        <input />
        <Button color='teal' content='コピー' icon='copy' labelPosition='right' onClick={e => copy(props.value)} />
        <QRCodeModal trigger={<Button color='teal' content='QRコード' icon='qrcode' labelPosition='right' />} value={props.value} />
      </Input>
    </React.Fragment>
  );
}

export default UrlPanel;
