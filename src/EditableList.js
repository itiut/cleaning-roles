import React from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import { CelledPanelSegment, CelledPanelTable } from './CelledPanel';

class AddingInput extends React.Component {
  constructor (props) {
    super(props);
    this.inputRef = null;
    this.state = {
      value: ''
    }
  }

  componentDidMount () {
    this.inputRef.focus();
  }

  update (event, data) {
    this.setState({ value: data.value });
  }

  submit (event) {
    const value = this.state.value.trim();
    if (value.length === 0) {
      return;
    }
    this.props.submit(value);
    this.setState({ value: '' });
  }

  render () {
    return (
      <Input action fluid ref={input => this.inputRef = input} value={this.state.value} onChange={this.update.bind(this)}>
        <input onKeyPress={e => e.key === 'Enter' ? this.submit(e) : false} />
        <Button content='追加' icon='add' positive disabled={this.state.value.length === 0} onClick={this.submit.bind(this)} />
      </Input>
    );
  }
}

function EditableListItem (props) {
  return (
    <Table.Row>
      <Table.Cell width={16}>
        <Input action fluid value={props.value} error={props.error} onChange={props.onChange} >
          <input />
          <Button size='small' tabIndex='-1' icon='arrow up' disabled={!props.canMoveUp} onClick={props.onMoveUp} />
          <Button size='small' tabIndex='-1' icon='arrow down' disabled={!props.canMoveDown} onClick={props.onMoveDown} />
          <Button size='small' tabIndex='-1' icon='delete' negative onClick={props.onDelete} />
        </Input>
      </Table.Cell>
    </Table.Row>
  );
}

function EditableList (props) {
  const listItems = props.items.map((item, index) => (
    <EditableListItem
      key={item.id}
      value={item.value}
      error={item.value.length === 0}
      canMoveUp={index > 0}
      canMoveDown={index < props.items.length - 1}
      onChange={(e, data) => props.changeItem(index, { ...item, value: data.value })}
      onMoveUp={e => props.swapItems(index - 1, index)}
      onMoveDown={e => props.swapItems(index, index + 1)}
      onDelete={e => props.changeItem(index)}
    />
  ));
  const list = props.items.length === 0 ? null : (
    <CelledPanelTable>
      {listItems}
    </CelledPanelTable>
  );
  return (
    <React.Fragment>
      {list}
      <CelledPanelSegment>
        <AddingInput submit={value => props.changeItem(props.items.length, { value })} />
      </CelledPanelSegment>
    </React.Fragment>
  );
}

export default EditableList;
