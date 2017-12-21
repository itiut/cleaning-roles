import React from 'react';
import { Step } from 'semantic-ui-react';

function StepPanel (props) {
  return (
    <Step.Group ordered size='large' widths={3} className='StepPanel'>
      <Step title='掃除する人にチェック' />
      <Step title='役割にチェック' />
      <Step title='割り当てを実行する' />
    </Step.Group>
  );
}

export default StepPanel;
