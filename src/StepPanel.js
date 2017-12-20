import React from 'react';
import { Step } from 'semantic-ui-react';

function StepPanel (props) {
  return (
    <Step.Group ordered size='large' widths={3}>
      <Step>
        <Step.Content>
          <Step.Title>掃除する人にチェック</Step.Title>
        </Step.Content>
      </Step>
      <Step>
        <Step.Content>
          <Step.Title>役割にチェック</Step.Title>
        </Step.Content>
      </Step>
      <Step>
        <Step.Content>
          <Step.Title>割り当てを実行する</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
}

export default StepPanel;
