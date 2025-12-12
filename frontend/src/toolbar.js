// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '24px', 
            background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
            borderBottom: '2px solid #e5e7eb',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            animation: 'slideIn 0.6s ease-out'
        }}>
            <h2 style={{ 
                margin: '0 0 20px 0', 
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
