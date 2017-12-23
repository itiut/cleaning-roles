import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import AssignmentsPanel from './AssignmentsPanel';
import { RolesPanel, UsersPanel } from './ItemsListPanel';
import StepPanel from './StepPanel';
import UrlPanel from './UrlPanel';
import { encodeParams, decodeParams } from './url';
import Items from './Items';
import './App.css';

const isChecked = item => item.checked;

class App extends React.Component {
  constructor (props) {
    super(props);
    const params = decodeParams(window.location, ['role', 'user']);
    this.roles = new Items('role', params['role']);
    this.users = new Items('user', params['user']);
    this.state = {
      roles: this.roles.data,
      users: this.users.data,
      assignments: {}
    };

    const itemsFn = (fnName) => (
      (key, ...args) => {
        const items = this[key];
        items[fnName](...args);
        this.setState({ [key]: items.data });
      }
    );
    this.changeItem = itemsFn('change');
    this.swapItems = itemsFn('swap');
  }

  get checkedRoles () {
    return this.state.roles.filter(isChecked);
  }

  get checkedUsers () {
    return this.state.users.filter(isChecked);
  }

  get currentUrl () {
    return encodeParams(window.location, [...this.roles.kvPairs(), ...this.users.kvPairs()]);
  }

  assignRoles () {
    const assignments = this.users.randomMapping(this.roles, isChecked);
    if (assignments) {
      this.setState({ assignments });
    }
  }

  resetAssignments () {
    this.setState({ assignments: {} });
  }

  render () {
    const nCheckedRoles = this.checkedRoles.length;
    const nCheckedUsers = this.checkedUsers.length;
    const canAssign = nCheckedRoles > 0 && nCheckedUsers > 0 && nCheckedRoles <= nCheckedUsers;
    return (
      <Container className='App'>
        <Header as='h1' content='掃除の分担' dividing />
        <StepPanel />
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column>
              <UsersPanel
                items={this.state.users}
                nCheckedItems={nCheckedUsers}
                changeItem={this.changeItem.bind(this, 'users')}
                swapItems={this.swapItems.bind(this, 'users')}
              />
            </Grid.Column>
            <Grid.Column>
              <RolesPanel
                items={this.state.roles}
                nCheckedItems={nCheckedRoles}
                error={nCheckedRoles > nCheckedUsers}
                changeItem={this.changeItem.bind(this, 'roles')}
                swapItems={this.swapItems.bind(this, 'roles')}
              />
            </Grid.Column>
            <Grid.Column>
              <AssignmentsPanel
                items={this.checkedUsers}
                assignments={this.state.assignments}
                canAssign={canAssign}
                error={nCheckedRoles > nCheckedUsers}
                assign={this.assignRoles.bind(this)}
                reset={this.resetAssignments.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <UrlPanel value={this.currentUrl} />
      </Container>
    );
  }
}

export default App;
