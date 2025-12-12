// BaseNode.js
// Base abstraction for all node types

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data,
  title,
  children,
  targetHandles = [],
  sourceHandles = [],
  width = 200,
  height = 80,
  className = '',
  style = {}
}) => {
  const baseStyle = {
    width,
    height,
    border: '2px solid #e1e8ed',
    borderRadius: '12px',
    padding: '12px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={baseStyle}>
      {/* Target Handles (Left side) */}
      {targetHandles.map((handle, index) => (
        <Handle
          key={handle.id || `target-${index}`}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style || {}}
        />
      ))}

      {/* Header */}
      {title && (
        <div style={{ 
          fontWeight: '700', 
          marginBottom: '10px',
          fontSize: '15px',
          color: '#111827',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '8px',
          letterSpacing: '-0.2px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* Source Handles (Right side) */}
      {sourceHandles.map((handle, index) => (
        <Handle
          key={handle.id || `source-${index}`}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};

