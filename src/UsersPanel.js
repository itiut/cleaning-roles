import React from 'react';
import { Button, Header, Icon, Segment, Statistic } from 'semantic-ui-react';
import EditableList from './EditableList';
import TogglableList from './TogglableList';

function EditButton (props) {
  if (props.editing) {
    return <Button content='確定' onClick={props.onClick} size='large' primary disabled={props.disabled} />;
  }
  return <Button content='編集' onClick={props.onClick} size='large' />;
}

class UsersPanel extends React.Component {
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
    this.props.handleItemChange('users', index, newElem);
  }

  handleItemSwap (i, j) {
    this.props.handleItemSwap('users', i, j);
  }

  toggleEditing () {
    this.setState(prevState => ({
      editing: !this.state.editing
    }));
  }

  render () {
    return (
      <React.Fragment>
        <Header as='h2' attached='top'>
          <Icon name='user' />
          <Header.Content>
            掃除する人
        </Header.Content>
        </Header>
        <Segment attached textAlign='right'>
          <Statistic horizontal>
            <Statistic.Value>{this.props.nCheckedUsers}</Statistic.Value>
            <Statistic.Label>人</Statistic.Label>
          </Statistic>
        </Segment>
        {this.state.editing
          ? <EditableList items={this.props.users} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap} />
          : <TogglableList items={this.props.users} sub='さん' handleItemChange={this.handleItemChange} />}
        <Segment attached textAlign='right'>
          <EditButton
            editing={this.state.editing}
            disabled={this.props.users.length === 0 || this.props.users.some(user => user.value.length === 0)}
            onClick={this.toggleEditing}
          />
        </Segment>
      </React.Fragment>
    );
  }
}

export default UsersPanel;
