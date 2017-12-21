import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import shortid from 'shortid';
import AssignmentsPanel from './AssignmentsPanel';
import RolesPanel from './RolesPanel';
import StepPanel from './StepPanel';
import UsersPanel from './UsersPanel';
import './App.css';

const roles = [
  { id: shortid.generate(), value: 'ゴミ捨て' },
  { id: shortid.generate(), value: 'ゴミ袋設置' },
  { id: shortid.generate(), value: 'テーブル拭き' },
];

const users = [
  { id: shortid.generate(), value: 'A' },
  { id: shortid.generate(), value: 'B' },
  { id: shortid.generate(), value: 'C' },
  { id: shortid.generate(), value: 'D' },
  { id: shortid.generate(), value: 'E' }
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
    this.handleItemSwap = this.handleItemSwap.bind(this);
  }

  get checkedRoles () {
    return this.state.roles.filter(role => role.checked);
  }

  get checkedUsers () {
    return this.state.users.filter(user => user.checked);
  }

  handleItemChange (key, index, newElem) {
    const newArray = this.state[key].slice();
    if (newElem) {
      // update or add
      if (!newElem.id) {
        // add
        newElem.id = shortid.generate();
      }
      newArray.splice(index, 1, newElem);
    } else {
      // delete
      newArray.splice(index, 1);
    }
    this.setState(prevState => ({
      [key]: newArray
    }));
  }

  handleItemSwap (key, i, j) {
    if (i < 0 || j >= this.state[key].length) {
      return;
    }
    const newArray = this.state[key].slice();
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
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
              <UsersPanel users={this.state.users} nCheckedUsers={nCheckedUsers} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap} />
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
