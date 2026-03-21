import React from 'react';

// Nuestro componente recibe "props" (datos que le pasaremos desde App.js)
function MetricCard(props) {
    return (
        <div style={{ padding: '30px', border: '2px solid #61dafb', borderRadius: '15px', backgroundColor: '#282c34', minWidth: '200px' }}>
            {/* Usamos las props para rellenar los datos dinámicamente */}
            <h3 style={{ margin: '0 0 10px 0', color: '#61dafb' }}>{props.title}</h3>
            <p style={{ fontSize: '50px', margin: '0', fontWeight: 'bold', color: 'white' }}>
                {props.value}
            </p>
        </div>
    );
}

export default MetricCard;