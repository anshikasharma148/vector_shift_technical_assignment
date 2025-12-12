// textNode.js

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data, width: nodeWidthProp, height: nodeHeightProp }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [parsedVariables, setParsedVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(nodeWidthProp || 200);
  const [nodeHeight, setNodeHeight] = useState(nodeHeightProp || 120);
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Parse variables from text
  useEffect(() => {
    const variablePattern = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    const seen = new Set();
    
    while ((match = variablePattern.exec(currText)) !== null) {
      const varName = match[1];
      if (!seen.has(varName)) {
        seen.add(varName);
        matches.push(varName);
      }
    }
    
    setParsedVariables(matches);
  }, [currText]);

  // Calculate dynamic sizing based on text content
  useEffect(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 20);
    const numLines = lines.length || 1;
    
    // Calculate width: min 200, max 400, based on content
    const calculatedWidth = Math.min(Math.max(maxLineLength * 8 + 40, 200), 400);
    
    // Calculate height: min 120 (to accommodate label + textarea), based on number of lines
    // Base height: 50 (header + padding) + 20 (label) + textarea height
    const calculatedHeight = Math.max(numLines * 24 + 90, 120);
    
    setNodeWidth(calculatedWidth);
    setNodeHeight(calculatedHeight);
    
    // Update node dimensions using store's updateNodeField
    updateNodeField(id, 'width', calculatedWidth);
    updateNodeField(id, 'height', calculatedHeight);
  }, [currText, id, updateNodeField]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, 'text', newText);
  };

  return (
    <div style={{ position: 'relative', width: nodeWidth, height: nodeHeight }}>
      <BaseNode
        id={id}
        data={data}
        title="Text"
        targetHandles={parsedVariables.map((varName, index) => {
          const totalVars = parsedVariables.length;
          const position = totalVars === 1 ? '50%' : `${((index + 1) * 100) / (totalVars + 1)}%`;
          return {
            id: `${id}-${varName}`,
            style: { top: position }
          };
        })}
        sourceHandles={[{ id: `${id}-output` }]}
        width={nodeWidth}
        height={nodeHeight}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', height: '100%' }}>
          Text:
          <textarea 
            value={currText} 
            onChange={handleTextChange}
            style={{ 
              padding: '4px', 
              fontSize: '12px',
              flex: 1,
              resize: 'none',
              fontFamily: 'inherit'
            }}
            placeholder="Enter text with {{ variables }}"
          />
        </label>
      </BaseNode>
    </div>
  );
}
