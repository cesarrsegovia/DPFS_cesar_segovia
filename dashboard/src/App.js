import React, { useState, useEffect } from 'react';
import './App.css';
import MetricCard from './components/MetricCard';
import LastProduct from './components/LastProduct';
import ProductList from './components/ProductList';

function App() {
  // 1. Nuestras cajas (Estados)
  const [usersCount, setUsersCount] = useState("Cargando...");
  const [productsCount, setProductsCount] = useState("Cargando...");
  
  // 👇 NUEVO: Caja para guardar todo el objeto del último producto
  const [lastProduct, setLastProduct] = useState(null); 
  const [productsList, setProductsList] = useState([]);

  // 2. useEffect: Buscamos los datos al cargar la página
  useEffect(() => {
    
    // Fetch de Usuarios (Queda igual)
    fetch('http://localhost:3000/api/users')
      .then(respuesta => respuesta.json())
      .then(datos => setUsersCount(datos.meta.count))
      .catch(error => console.error("Error usuarios:", error));

    // 👇 Fetch de Productos (Actualizado)
    fetch('http://localhost:3000/api/products')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setProductsCount(datos.meta.count);
        
        // Magia de JavaScript: Agarramos el array de productos y sacamos el último
        const arrayProductos = datos.data;
        const elUltimo = arrayProductos[arrayProductos.length - 1]; 
        
        setLastProduct(elUltimo); // Lo guardamos en su caja
        setProductsList(arrayProductos); // Guardamos toda la lista por si queremos usarla después
      })
      .catch(error => console.error("Error productos:", error));

  }, []);

  // --- MAGIA PARA CONTAR CATEGORÍAS ÚNICAS ---
  let totalCategories = "Cargando...";
  
  if (productsList.length > 0) {
    // Extraemos solo las categorías de todos los productos
    const todasLasCategorias = productsList.map(producto => producto.category);
    
    // 'Set' es un truco de JS que elimina automáticamente los duplicados
    const categoriasUnicas = new Set(todasLasCategorias);
    
    // Contamos cuántas quedaron
    totalCategories = categoriasUnicas.size; 
  }

  // 3. La Vista
  return (
    <div className="App">
      <header className="App-header">
        <h1>📊 Panel de Control (Dashboard)</h1>
        
        {/* --- TARJETAS DE MÉTRICAS (Ahora usando nuestro Componente) --- */}
        <div style={{ display: 'flex', gap: '30px', marginTop: '30px' }}>
          
          <MetricCard title="Usuarios Totales" value={usersCount} />
          <MetricCard title="Productos en Venta" value={productsCount} />
          <MetricCard title="Categorías Totales" value={totalCategories} />

        </div>

        {/* --- ÚLTIMO PRODUCTO (Usando el Componente) --- */}
        <LastProduct product={lastProduct} />

        {/* --- LISTADO DE PRODUCTOS (Usando el Componente) --- */}
        <ProductList products={productsList} />

      </header>
    </div>
  );
}

export default App;