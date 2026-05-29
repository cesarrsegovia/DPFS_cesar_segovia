import React, { useState, useEffect } from 'react';
import './App.css';
import MetricCard from './components/MetricCard';
import LastProduct from './components/LastProduct';
import ProductList from './components/ProductList';
import CategoryPanel from './components/CategoryPanel';

function App() {
  // 1. Nuestras cajas (Estados)
  const [usersCount, setUsersCount] = useState("Cargando...");
  const [productsCount, setProductsCount] = useState("Cargando...");
  const [lastProduct, setLastProduct] = useState(null); 
  const [productsList, setProductsList] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState({});

  // 2. useEffect: Buscamos los datos al cargar la página
  useEffect(() => {
    
    // Fetch de Usuarios (Directo, sin meta)
    fetch('http://localhost:3000/api/users')
      .then(respuesta => respuesta.json())
      .then(datos => setUsersCount(datos.count))
      .catch(error => console.error("Error usuarios:", error));

    // Fetch de Productos (Directo, sin meta)
    fetch('http://localhost:3000/api/products')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setProductsCount(datos.count);
        setCategoriesCount(datos.countByCategory || {});
        
        const arrayProductos = datos.products || [];
        setProductsList(arrayProductos);
        
        // Buscamos los detalles completos del último producto creado para mostrar su precio y descripción
        if (arrayProductos.length > 0) {
          const elUltimo = arrayProductos[arrayProductos.length - 1]; 
          fetch(elUltimo.detail)
            .then(res => res.json())
            .then(prodDetail => setLastProduct(prodDetail))
            .catch(err => console.error("Error detalle del último producto:", err));
        }
      })
      .catch(error => console.error("Error productos:", error));

  }, []);

  // --- CONTAR CATEGORÍAS ÚNICAS ---
  const totalCategories = Object.keys(categoriesCount).length;

  // 3. La Vista
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ margin: '30px 0 10px 0', fontSize: '2.5rem', color: '#61dafb' }}>📊 Panel de Control (Dashboard)</h1>
        
        {/* --- TARJETAS DE MÉTRICAS --- */}
        <div style={{ display: 'flex', gap: '30px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <MetricCard title="Usuarios Totales" value={usersCount} />
          <MetricCard title="Productos en Venta" value={productsCount} />
          <MetricCard title="Categorías Totales" value={totalCategories} />

        </div>

        {/* --- ÚLTIMO PRODUCTO --- */}
        <LastProduct product={lastProduct} />

        {/* --- CATEGORÍAS BREAKDOWN --- */}
        <CategoryPanel categories={categoriesCount} />

        {/* --- LISTADO DE PRODUCTOS --- */}
        <ProductList products={productsList} />

      </header>
    </div>
  );
}

export default App;