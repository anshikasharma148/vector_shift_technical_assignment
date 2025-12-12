// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          backgroundColor: '#6366f1',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.2s ease',
          border: '2px solid transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4f46e5';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#6366f1';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
        }}
        draggable
      >
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{label}</span>
      </div>
    );
  };
  