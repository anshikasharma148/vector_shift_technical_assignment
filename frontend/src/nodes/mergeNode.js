// mergeNode.js

import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      targetHandles={[
        { id: `${id}-input1`, style: { top: '30%' } },
        { id: `${id}-input2`, style: { top: '50%' } },
        { id: `${id}-input3`, style: { top: '70%' } }
      ]}
      sourceHandles={[{ id: `${id}-output` }]}
      width={200}
      height={140}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#333' }}>
          Merges multiple inputs
        </div>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Combines all inputs into a single output
        </div>
      </div>
    </BaseNode>
  );
}


