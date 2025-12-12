// filterNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCriteria, setFilterCriteria] = useState(data?.filterCriteria || 'length > 0');

  const handleCriteriaChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[
        { id: `${id}-passed`, style: { top: '30%' } },
        { id: `${id}-filtered`, style: { top: '70%' } }
      ]}
      width={220}
      height={140}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Filter Criteria:
          <input 
            type="text" 
            value={filterCriteria} 
            onChange={handleCriteriaChange}
            style={{ padding: '4px', fontSize: '12px' }}
            placeholder="e.g., length > 0"
          />
        </label>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Passed → top output<br />
          Filtered → bottom output
        </div>
      </div>
    </BaseNode>
  );
}


