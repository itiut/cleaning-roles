import React from 'react';
import { Button, Input, Table } from 'semantic-ui-react';
import { CelledPanelSegment, CelledPanelTable } from './CelledPanel';

class AddingInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event, data) {
    this.setState({ value: data.value });
  }

  handleSubmit (event) {
    this.props.handleItemAdd(this.state.value.trim());
    this.setState({ value: '' });
  }

  render () {
    return (
      <Input action fluid value={this.state.value} onChange={this.handleChange}>
        <input />
        <Button content='追加' positive disabled={this.state.value.length === 0} onClick={this.handleSubmit} />
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
          <Button size='small' icon='arrow up' disabled={!props.canMoveUp} onClick={props.handleItemMoveUp} />
          <Button size='small' icon='arrow down' disabled={!props.canMoveDown} onClick={props.handleItemMoveDown} />
          <Button size='small' icon='delete' negative onClick={props.handleItemDelete} />
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
      handleItemMoveUp={e => props.handleItemSwap(index - 1, index)}
      handleItemMoveDown={e => props.handleItemSwap(index, index + 1)}
      handleItemDelete={e => props.changeItem(index)}
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
        <AddingInput handleItemAdd={value => props.changeItem(props.items.length, { value })} />
      </CelledPanelSegment>
    </React.Fragment>
  );
}

export default EditableList;
