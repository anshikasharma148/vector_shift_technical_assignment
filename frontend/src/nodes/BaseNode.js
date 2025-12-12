// BaseNode.js
// Base abstraction for all node types

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

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
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this node?')) {
      deleteNode(id);
    }
  };
  const baseStyle = {
    width,
    height,
    minHeight: height,
    border: '2px solid #e1e8ed',
    borderRadius: '12px',
    padding: '12px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
    overflow: 'visible',
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={baseStyle}>
      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(239, 68, 68, 0.9)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          lineHeight: '1',
          padding: 0
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(220, 38, 38, 1)';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        }}
        title="Delete node"
      >
        ×
      </button>

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
          marginBottom: '8px',
          fontSize: '15px',
          color: '#111827',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '6px',
          paddingRight: '28px',
          letterSpacing: '-0.2px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          flexShrink: 0
        }}>
          {title}
        </div>
      )}

      {/* Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'visible',
        gap: '4px'
      }}>
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

