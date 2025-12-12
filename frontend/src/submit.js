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
        setLoading(false);
    };

    return (
        <>
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '24px',
                background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)',
                borderTop: '2px solid #e5e7eb',
                boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.04)',
                animation: 'slideIn 0.6s ease-out'
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
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease-out'
                }} onClick={closeAlert}>
                    <div style={{
                        background: 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
                        borderRadius: '20px',
                        padding: '32px',
                        maxWidth: '520px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.8)',
                        animation: 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #ec4899 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'gradient 3s ease infinite'
                        }}></div>
                        <h2 style={{
                            margin: '8px 0 24px 0',
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#111827',
                            letterSpacing: '-0.5px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
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
                                    padding: '16px',
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                                    borderRadius: '12px',
                                    border: '1.5px solid #e5e7eb',
                                    transition: 'all 0.3s ease',
                                    animation: 'fadeIn 0.5s ease-out 0.1s both'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '8px', color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Number of Nodes
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#111827', letterSpacing: '-1px' }}>
                                        {alertData.num_nodes}
                                    </div>
                                </div>
                                
                                <div style={{
                                    padding: '16px',
                                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                                    borderRadius: '12px',
                                    border: '1.5px solid #e5e7eb',
                                    transition: 'all 0.3s ease',
                                    animation: 'fadeIn 0.5s ease-out 0.2s both'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '8px', color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Number of Edges
                                    </div>
                                    <div style={{ fontSize: '32px', fontWeight: '800', color: '#111827', letterSpacing: '-1px' }}>
                                        {alertData.num_edges}
                                    </div>
                                </div>
                                
                                <div style={{
                                    padding: '16px',
                                    background: alertData.is_dag 
                                        ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' 
                                        : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                                    borderRadius: '12px',
                                    border: `2px solid ${alertData.is_dag ? '#86efac' : '#fca5a5'}`,
                                    transition: 'all 0.3s ease',
                                    animation: 'fadeIn 0.5s ease-out 0.3s both',
                                    boxShadow: alertData.is_dag 
                                        ? '0 4px 12px rgba(16, 185, 129, 0.2)' 
                                        : '0 4px 12px rgba(239, 68, 68, 0.2)'
                                }}>
                                    <div style={{ fontWeight: '600', marginBottom: '8px', color: '#6b7280', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                        Is DAG
                                    </div>
                                    <div style={{ 
                                        fontSize: '32px', 
                                        fontWeight: '800',
                                        color: alertData.is_dag ? '#16a34a' : '#dc2626',
                                        letterSpacing: '-1px',
                                        animation: alertData.is_dag ? 'pulse 2s ease-in-out infinite' : 'none'
                                    }}>
                                        {alertData.is_dag ? 'Yes ✓' : 'No ✗'}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                closeAlert();
                            }}
                            style={{
                                marginTop: '24px',
                                width: '100%',
                                padding: '12px 24px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                                position: 'relative',
                                zIndex: 10
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
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
