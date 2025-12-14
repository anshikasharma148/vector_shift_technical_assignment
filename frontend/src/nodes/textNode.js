// textNode.js

import { useState, useEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, width: nodeWidthProp, height: nodeHeightProp }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth] = useState(nodeWidthProp || 200);
  const [nodeHeight, setNodeHeight] = useState(nodeHeightProp || 120);

  const updateNodeField = useStore((state) => state.updateNodeField);

  /* ----------------------------------------
     Parse variables from {{variable}}
  ---------------------------------------- */
  const parsedVariables = useMemo(() => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    const seen = new Set();
    let match;

    while ((match = variablePattern.exec(currText)) !== null) {
      if (!seen.has(match[1])) {
        seen.add(match[1]);
        vars.push(match[1]);
      }
    }
    return vars;
  }, [currText]);

  /* ----------------------------------------
     Dynamic sizing
  ---------------------------------------- */
  useEffect(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 20);
    const numLines = Math.max(lines.length, 1);

    const calculatedWidth = Math.min(Math.max(maxLineLength * 8 + 40, 200), 400);
    const calculatedHeight = Math.max(numLines * 24 + 90, 120);

    setNodeWidth(calculatedWidth);
    setNodeHeight(calculatedHeight);

    updateNodeField(id, 'width', calculatedWidth);
    updateNodeField(id, 'height', calculatedHeight);
  }, [currText, id, updateNodeField]);

  /* ----------------------------------------
     Stable target handles (IMPORTANT FIX)
  ---------------------------------------- */
  const targetHandles = useMemo(() => {
    return parsedVariables.map((_, index) => ({
      id: `${id}-input-${index}`, // ✅ stable ID
      style: {
        top: `${((index + 1) * 100) / (parsedVariables.length + 1)}%`,
      },
    }));
  }, [parsedVariables.length, id]);

  /* ----------------------------------------
     Text change
  ---------------------------------------- */
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  /* ----------------------------------------
     Render
  ---------------------------------------- */
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      targetHandles={targetHandles}
      sourceHandles={[{ id: `${id}-output` }]}
      width={nodeWidth}
      height={nodeHeight}
    >
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          fontSize: '12px',
          height: '100%',
        }}
      >
        Text:
        <textarea
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{ variables }}"
          style={{
            padding: '4px',
            fontSize: '12px',
            flex: 1,
            resize: 'none',
            fontFamily: 'inherit',
          }}
        />
      </label>
    </BaseNode>
  );
};
