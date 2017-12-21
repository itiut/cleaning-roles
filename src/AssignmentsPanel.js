import React from 'react';
import { Button } from 'semantic-ui-react';
import AssignmentsList from './AssignmentsList';
import { CelledPanelHeader, CelledPanelSegment } from './CelledPanel';

function AssignmentPanel (props) {
  return (
    <React.Fragment>
      <CelledPanelHeader icon='shuffle' text='割り当て' />
      <CelledPanelSegment>
        <Button primary size='large' disabled={!props.canAssign} onClick={props.assignHandler}>実行</Button>
      </CelledPanelSegment>
      <AssignmentsList items={props.assignments} />
    </React.Fragment>
  );
}

export default AssignmentPanel;
