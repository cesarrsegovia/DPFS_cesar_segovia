import React from 'react';

function ProductList(props) {
    return (
        <div style={{ marginTop: '50px', width: '80%', padding: '20px', backgroundColor: '#282c34', borderRadius: '15px', border: '1px solid #61dafb' }}>
            <h2 style={{ color: '#61dafb', borderBottom: '1px solid #61dafb', paddingBottom: '10px' }}>
                Listado de Productos
            </h2>
            
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left', color: 'white' }}>
                
                {/* Mensaje por si la base de datos tarda en responder */}
                {props.products.length === 0 && <li>Cargando productos...</li>}

                {/* Recorremos el array que viene en las props */}
                {props.products.map((producto, index) => {
                    return (
                        <li key={index} style={{ padding: '15px', borderBottom: '1px solid gray', display: 'flex', justifyContent: 'space-between' }}>
                            <span><strong>{producto.name}</strong></span>
                            <span>${producto.price}</span>
                        </li>
                    );
                })}

            </ul>
        </div>
    );//asdasddsa
}

export default ProductList;