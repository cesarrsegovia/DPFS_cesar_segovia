import React from 'react';

function CategoryPanel(props) {
    const categoryEntries = Object.entries(props.categories || {});

    return (
        <div style={{ marginTop: '50px', width: '80%', padding: '30px', backgroundColor: '#282c34', borderRadius: '15px', border: '1px solid #61dafb' }}>
            <h2 style={{ color: '#61dafb', borderBottom: '1px solid #61dafb', paddingBottom: '15px', marginBottom: '25px', textAlign: 'center' }}>
                📂 Productos por Categoría
            </h2>
            
            {categoryEntries.length === 0 ? (
                <p style={{ color: 'white', textAlign: 'center' }}>Cargando categorías...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {categoryEntries.map(([category, count], index) => {
                        return (
                            <div key={index} style={{ 
                                backgroundColor: '#1c2025', 
                                border: '1px solid #4f5b66', 
                                padding: '20px', 
                                borderRadius: '10px', 
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                                cursor: 'default'
                            }}>
                                <h3 style={{ color: '#61dafb', textTransform: 'uppercase', fontSize: '1rem', margin: '0 0 10px 0' }}>
                                    {category}
                                </h3>
                                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                                    {count}
                                </p>
                                <span style={{ color: 'gray', fontSize: '0.8rem' }}>
                                    {count === 1 ? 'producto' : 'productos'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CategoryPanel;
