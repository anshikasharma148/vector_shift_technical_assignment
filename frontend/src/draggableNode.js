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
          minWidth: '110px', 
          height: '65px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          justifyContent: 'center', 
          flexDirection: 'column',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '2px solid transparent',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeIn 0.5s ease-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.5)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
          e.currentTarget.style.borderColor = 'transparent';
        }}
        draggable
      >
          <span style={{ 
            color: '#fff', 
            fontWeight: '600', 
            fontSize: '14px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.3px',
            position: 'relative',
            zIndex: 1
          }}>{label}</span>
      </div>
    );
  };
  