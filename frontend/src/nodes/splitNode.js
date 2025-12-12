// splitNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const SplitNode = ({ id, data }) => {
  const [delimiter, setDelimiter] = useState(data?.delimiter || ',');

  const handleDelimiterChange = (e) => {
    setDelimiter(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[
        { id: `${id}-output1`, style: { top: '30%' } },
        { id: `${id}-output2`, style: { top: '50%' } },
        { id: `${id}-output3`, style: { top: '70%' } }
      ]}
      width={200}
      height={150}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Delimiter:
          <input 
            type="text" 
            value={delimiter} 
            onChange={handleDelimiterChange}
            style={{ padding: '4px', fontSize: '12px' }}
            placeholder=","
          />
        </label>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Splits input into multiple outputs
        </div>
      </div>
    </BaseNode>
  );
}


