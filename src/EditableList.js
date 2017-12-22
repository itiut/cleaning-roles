import React from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import { CelledPanelSegment, CelledPanelTable } from './CelledPanel';

class AddingInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  update (event, data) {
    this.setState({ value: data.value });
  }

  submit (event) {
    this.props.submit(this.state.value.trim());
    this.setState({ value: '' });
  }

  render () {
    return (
      <Input action fluid value={this.state.value} onChange={this.update.bind(this)}>
        <input />
        <Button content='追加' positive disabled={this.state.value.length === 0} onClick={this.submit.bind(this)} />
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
          <Button size='small' icon='arrow up' disabled={!props.canMoveUp} onClick={props.onMoveUp} />
          <Button size='small' icon='arrow down' disabled={!props.canMoveDown} onClick={props.onMoveDown} />
          <Button size='small' icon='delete' negative onClick={props.onDelete} />
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
