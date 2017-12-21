import React from 'react';
import { Button, Statistic } from 'semantic-ui-react';
import EditableList from './EditableList';
import TogglableList from './TogglableList';
import { CelledPanelHeader, CelledPanelSegment } from './CelledPanel';
import { checkedItems } from './model';

function EditButton (props) {
  if (props.editing) {
    return <Button content='完了' onClick={props.onClick} size='large' primary disabled={props.disabled} />;
  }
  return <Button content='編集' onClick={props.onClick} size='large' />;
}

function CheckedCount (props) {
  return (
    <Statistic horizontal color={props.color || 'black'}>
      <Statistic.Value>{props.value}</Statistic.Value>
      <Statistic.Label>{props.label}</Statistic.Label>
    </Statistic>
  );
}

class ItemsListPanel extends React.Component {
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
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  render () {
    return (
      <React.Fragment>
        <CelledPanelHeader {...this.props.header} />
        <CelledPanelSegment>
          <CheckedCount {...this.props.checkedCount} value={checkedItems(this.props.items).length} />
        </CelledPanelSegment>
        {this.state.editing
          ? <EditableList items={this.props.items} handleItemChange={this.handleItemChange} handleItemSwap={this.handleItemSwap} />
          : <TogglableList items={this.props.items} label={this.props.label} handleItemChange={this.handleItemChange} />}
        <CelledPanelSegment>
          <EditButton
            editing={this.state.editing}
            disabled={this.props.items.length === 0 || this.props.items.some(item => item.value.length === 0)}
            onClick={this.toggleEditing}
          />
        </CelledPanelSegment>
      </React.Fragment>
    );
  }
}

function RolesPanel (props) {
  return (
    <ItemsListPanel
      {...props}
      type='roles'
      header={{
        icon: 'wrench',
        text: '役割'
      }}
      checkedCount={{
        color: props.error ? 'red' : null,
        label: 'コ'
      }}
    />
  );
}

function UsersPanel (props) {
  return (
    <ItemsListPanel
      {...props}
      type='users'
      header={{
        icon: 'user',
        text: '掃除する人'
      }}
      label='さん'
      checkedCount={{
        label: '人'
      }}
    />
  );
}

export { RolesPanel, UsersPanel };
