import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import AssignmentsPanel from './AssignmentsPanel';
import LinkPanel from './LinkPanel';
import RolesPanel from './RolesPanel';
import StepPanel from './StepPanel';
import UsersPanel from './UsersPanel';
import { checkedItems, createItems, normalizeItem, urlSearchString } from './model';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    const { roles, users } = createItems(window.location);
    this.state = {
      roles, users,
      assignments: []
    };
    this.assignRoles = this.assignRoles.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleItemSwap = this.handleItemSwap.bind(this);
  }

  get checkedRoles () {
    return checkedItems(this.state.roles);
  }

  get checkedUsers () {
    return checkedItems(this.state.users);
  }

  get currentUrl () {
    return window.location.origin + '?' + urlSearchString(this.state.roles, this.state.users);
  }

  handleItemChange (key, index, newItem) {
    const newArray = this.state[key];
    if (newItem) {
      // update or add
      normalizeItem(newItem);
      newArray.splice(index, 1, newItem);
    } else {
      // delete
      newArray.splice(index, 1);
    }
    this.setState({ [key]: newArray });
  }

  handleItemSwap (key, i, j) {
    if (i < 0 || j >= this.state[key].length) {
      return;
    }
    const newArray = this.state[key];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    this.setState({ [key]: newArray });
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
        <Header as='h1' content='掃除の割り当て' dividing />
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
              <UsersPanel items={this.state.users} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap} />
            </Grid.Column>
            <Grid.Column>
              <RolesPanel items={this.state.roles} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap}
                error={nCheckedRoles > nCheckedUsers}
              />
            </Grid.Column>
            <Grid.Column>
              <AssignmentsPanel assignments={this.state.assignments} canAssign={canAssign} assignHandler={this.assignRoles} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <LinkPanel value={this.currentUrl} />
      </Container>
    );
  }
}

export default App;
