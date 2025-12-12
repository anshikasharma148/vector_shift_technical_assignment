// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const clearCanvas = useStore((state) => state.clearCanvas);
    const nodes = useStore((state) => state.nodes);

    const handleClearCanvas = () => {
        if (nodes.length === 0) {
            return;
        }
        if (window.confirm('Are you sure you want to clear the entire canvas? This will delete all nodes and connections.')) {
            clearCanvas();
        }
    };

    return (
        <div style={{ 
            padding: '24px', 
            background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            animation: 'slideIn 0.6s ease-out'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h2 style={{ 
                    margin: 0, 
                    fontSize: '20px', 
                    fontWeight: '700',
                    color: '#111827',
                    letterSpacing: '-0.3px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    Node Palette
                </h2>
                <button
                    type="button"
                    onClick={handleClearCanvas}
                    disabled={nodes.length === 0}
                    style={{
                        padding: '8px 16px',
                        background: nodes.length === 0 
                            ? '#e5e7eb' 
                            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: nodes.length === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: nodes.length === 0 ? 'none' : '0 2px 8px rgba(239, 68, 68, 0.3)',
                        opacity: nodes.length === 0 ? 0.5 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (nodes.length > 0) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (nodes.length > 0) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(239, 68, 68, 0.3)';
                        }
                    }}
                >
                    Clear Canvas
                </button>
            </div>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px'
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='conditional' label='Conditional' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='split' label='Split' />
                <DraggableNode type='filter' label='Filter' />
            </div>
        </div>
    );
};
