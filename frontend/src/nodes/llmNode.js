// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      targetHandles={[
        { id: `${id}-system`, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, style: { top: `${200/3}%` } }
      ]}
      sourceHandles={[{ id: `${id}-response` }]}
      width={200}
      height={100}
    >
      <div style={{ fontSize: '12px', color: '#666' }}>
        This is a LLM.
      </div>
    </BaseNode>
  );
}
