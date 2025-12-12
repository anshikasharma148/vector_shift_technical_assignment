// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#ffffff',
            borderBottom: '2px solid #e1e8ed',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
            <h2 style={{ 
                margin: '0 0 16px 0', 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#1e293b'
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
