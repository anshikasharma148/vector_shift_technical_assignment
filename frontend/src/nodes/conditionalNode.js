// conditionalNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'value > 0');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Conditional"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[
        { id: `${id}-true`, style: { top: '30%' } },
        { id: `${id}-false`, style: { top: '70%' } }
      ]}
      width={220}
      height={120}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Condition:
          <input 
            type="text" 
            value={condition} 
            onChange={handleConditionChange}
            style={{ padding: '4px', fontSize: '12px' }}
            placeholder="e.g., value > 0"
          />
        </label>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          True → top output<br />
          False → bottom output
        </div>
      </div>
    </BaseNode>
  );
}


