import React from 'react';
import { Button, Statistic } from 'semantic-ui-react';
import EditableList from './EditableList';
import TogglableList from './TogglableList';
import { CelledPanelHeader, CelledPanelSegment } from './CelledPanel';

function EditButton (props) {
  if (props.editing) {
    return <Button content='完了' icon='save' onClick={props.onClick} size='large' disabled={props.disabled} primary />;
  }
  if (props.added) {
    return <Button content='編集' icon='edit' onClick={props.onClick} size='large' />;
  }
  return <Button content='追加' icon='add' onClick={props.onClick} size='large' positive />;
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
  }

  toggleEditing () {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  render () {
    return (
      <React.Fragment>
        <CelledPanelHeader {...this.props.header} />
        <CelledPanelSegment>
          <CheckedCount {...this.props.checkedCount} />
        </CelledPanelSegment>
        {this.state.editing
          ? <EditableList items={this.props.items} changeItem={this.props.changeItem} swapItems={this.props.swapItems} />
          : <TogglableList items={this.props.items} label={this.props.label} changeItem={this.props.changeItem} />}
        <CelledPanelSegment attached='bottom'>
          <EditButton
            added={this.props.items.length > 0}
            editing={this.state.editing}
            disabled={this.props.items.length === 0 || this.props.items.some(item => item.value.length === 0)}
            onClick={this.toggleEditing.bind(this)}
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
      header={{
        content: '役割',
        icon: 'wrench'
      }}
      checkedCount={{
        color: props.error ? 'red' : null,
        label: 'コ',
        value: props.nCheckedItems
      }}
    />
  );
}

function UsersPanel (props) {
  return (
    <ItemsListPanel
      {...props}
      header={{
        content: '掃除する人',
        icon: 'user'
      }}
      label='さん'
      checkedCount={{
        label: '人',
        value: props.nCheckedItems
      }}
    />
  );
}

export { RolesPanel, UsersPanel };
