import React from 'react';

function LastProduct(props) {
    // Si todavía no llegó el producto desde la API, mostramos un mensaje de carga
    if (!props.product) {
        return <p style={{ color: 'white' }}>Cargando último producto...</p>;
    }

    return (
        <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#282c34', borderRadius: '15px', border: '1px solid white', width: '50%' }}>
            <h2 style={{ color: '#61dafb', borderBottom: '1px solid white', paddingBottom: '10px' }}>
                Último Producto Creado
            </h2>
            <h3 style={{ textTransform: 'uppercase', color: 'white' }}>{props.product.name}</h3>
            <p style={{ color: 'white' }}><strong>Descripción:</strong> {props.product.description}</p>
            <p style={{ color: 'white' }}><strong>Precio:</strong> ${props.product.price}</p>
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>ID en Base de Datos: {props.product.id}</p>
        </div>
    );
}

export default LastProduct;