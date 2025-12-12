// transformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
      width={200}
      height={130}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Transform Type:
          <select value={transformType} onChange={handleTypeChange} style={{ padding: '4px', fontSize: '12px' }}>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="reverse">Reverse</option>
            <option value="trim">Trim</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Transforms input data
        </div>
      </div>
    </BaseNode>
  );
}


