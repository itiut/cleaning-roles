import React from 'react';
import { Button, Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import EditableList from './EditableList';
import TogglableList from './TogglableList';
import { checkedItems } from './model';

function EditButton (props) {
  if (props.editing) {
    return <Button content='完了' onClick={props.onClick} size='large' primary disabled={props.disabled} />;
  }
  return <Button content='編集' onClick={props.onClick} size='large' />;
}

function ListPanelHeader (props) {
  return (
    <Header as='h2' attached='top'>
      <Icon name={props.icon} />
      <Header.Content>
        {props.text}
      </Header.Content>
    </Header>
  );
}

function ListPanelStatistic (props) {
  return (
    <Segment attached textAlign='right'>
      <Statistic horizontal color={props.color || 'black'}>
        <Statistic.Value>{props.value}</Statistic.Value>
        <Statistic.Label>{props.label}</Statistic.Label>
      </Statistic>
    </Segment>
  );
}

class ListPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editing: false
    };
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleItemSwap = this.handleItemSwap.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  handleItemChange (index, newElem) {
    this.props.handleItemChange(this.props.type, index, newElem);
  }

  handleItemSwap (i, j) {
    this.props.handleItemSwap(this.props.type, i, j);
  }

  toggleEditing () {
    this.setState({ editing: !this.state.editing });
  }

  render () {
    return (
      <React.Fragment>
        <ListPanelHeader {...this.props.header} />
        <ListPanelStatistic {...this.props.statistic} value={checkedItems(this.props.items).length} />
        {this.state.editing
          ? <EditableList items={this.props.items} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap} />
          : <TogglableList items={this.props.items} label={this.props.label} handleItemChange={this.handleItemChange} />}
        <Segment attached textAlign='right'>
          <EditButton
            editing={this.state.editing}
            disabled={this.props.items.length === 0 || this.props.items.some(item => item.value.length === 0)}
            onClick={this.toggleEditing}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default ListPanel;
