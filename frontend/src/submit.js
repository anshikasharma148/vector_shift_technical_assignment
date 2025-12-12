// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    
    const selector = (state) => ({
        nodes: state.nodes,
        edges: state.edges,
    });
    
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        setLoading(true);
        setAlertData(null);
        
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nodes: nodes,
                    edges: edges,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setAlertData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setAlertData({
                error: true,
                message: 'Failed to submit pipeline. Make sure the backend is running.',
            });
        } finally {
            setLoading(false);
        }
    };

    const closeAlert = () => {
        setAlertData(null);
    };

    return (
        <>
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderTop: '2px solid #e1e8ed'
            }}>
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        minWidth: '120px',
                        fontSize: '16px',
                        padding: '12px 32px',
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Pipeline'}
                </button>
            </div>

            {/* Alert Modal */}
            {alertData && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={closeAlert}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{
                            margin: '0 0 16px 0',
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#1e293b'
                        }}>
                            Pipeline Validation Results
                        </h2>
                        
                        {alertData.error ? (
                            <div style={{ color: '#ef4444', marginBottom: '16px' }}>
                                {alertData.message}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '8px',
                                    border: '1px solid #e1e8ed'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px', color: '#64748b' }}>
                                        Number of Nodes:
                                    </div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
                                        {alertData.num_nodes}
                                    </div>
                                </div>
                                
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '8px',
                                    border: '1px solid #e1e8ed'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px', color: '#64748b' }}>
                                        Number of Edges:
                                    </div>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>
                                        {alertData.num_edges}
                                    </div>
                                </div>
                                
                                <div style={{
                                    padding: '12px',
                                    backgroundColor: alertData.is_dag ? '#f0fdf4' : '#fef2f2',
                                    borderRadius: '8px',
                                    border: `1px solid ${alertData.is_dag ? '#86efac' : '#fca5a5'}`
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px', color: '#64748b' }}>
                                        Is DAG:
                                    </div>
                                    <div style={{ 
                                        fontSize: '24px', 
                                        fontWeight: '700',
                                        color: alertData.is_dag ? '#16a34a' : '#dc2626'
                                    }}>
                                        {alertData.is_dag ? 'Yes ✓' : 'No ✗'}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <button
                            onClick={closeAlert}
                            style={{
                                marginTop: '20px',
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
