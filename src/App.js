import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import AssignmentsPanel from './AssignmentsPanel';
import RolesPanel from './RolesPanel';
import StepPanel from './StepPanel';
import UsersPanel from './UsersPanel';
import './App.css';

const roles = [
  { id: 1, name: 'ゴミ捨て' },
  { id: 2, name: 'ゴミ袋設置' },
  { id: 3, name: 'テーブル拭き' },
];

const users = [
  { id: 1, name: 'Aさん' },
  { id: 2, name: 'Bさん' },
  { id: 3, name: 'Cさん' },
  { id: 4, name: 'Dさん' },
  { id: 5, name: 'Eさん' }
];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      roles, users,
      assignments: []
    };
    this.assignRoles = this.assignRoles.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  get checkedRoles () {
    return this.state.roles.filter(role => role.checked);
  }

  get checkedUsers () {
    return this.state.users.filter(user => user.checked);
  }

  handleItemChange (key, array, index, newElem) {
    const newArray = array.slice();
    newArray.splice(index, 1, newElem);
    this.setState(prevState => ({
      [key]: newArray
    }));
  }

  assignRoles () {
    const checkedRoles = this.checkedRoles;
    const checkedUsers = this.checkedUsers;
    if (checkedRoles.length > checkedUsers.length) {
      return;
    }
    while (checkedRoles.length < checkedUsers.length) {
      checkedRoles.push(null);
    }
    checkedUsers.forEach(user => {
      const i = Math.floor(Math.random() * checkedRoles.length);
      user.assignment = checkedRoles.splice(i, 1)[0];
    });
    this.setState(prevState => ({
      assignments: checkedUsers
    }));
  }

  render () {
    const nCheckedRoles = this.checkedRoles.length;
    const nCheckedUsers = this.checkedUsers.length;
    const canAssign = nCheckedRoles > 0 && nCheckedUsers > 0 && nCheckedRoles <= nCheckedUsers;
    return (
      <Container>
        <Header as='h1' dividing>
          掃除の割り当て
        </Header>
        <Grid columns={1} className='StepPanelGrid'>
          <Grid.Row>
            <Grid.Column>
              <StepPanel />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid centered columns={3}>
          <Grid.Row centered>
            <Grid.Column>
              <UsersPanel users={this.state.users} nCheckedUsers={nCheckedUsers} handleItemChange={this.handleItemChange} />
            </Grid.Column>
            <Grid.Column>
              <RolesPanel roles={this.state.roles} nCheckedRoles={nCheckedRoles} nCheckedUsers={nCheckedUsers} nMaxRoles={nCheckedUsers} handleItemChange={this.handleItemChange} />
            </Grid.Column>
            <Grid.Column>
              <AssignmentsPanel assignments={this.state.assignments} canAssign={canAssign} assignHandler={this.assignRoles} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
