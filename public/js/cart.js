window.addEventListener('load', () => {
    console.log("🕵️‍♂️ Script de carrito dinámico cargado.");

    const email = window.currentUserEmail || 'guest';
    const storageKey = `cart_${email}`;

    // ============================================
    // 0. ACTUALIZAR EL BADGE DEL CARRITO EN HEADER
    // ============================================
    const cartBadge = document.querySelector('#cart-badge');
    
    function updateCartBadge() {
        if (!cartBadge) return;
        const cart = JSON.parse(localStorage.getItem(storageKey)) || [];
        const totalItems = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);

        if (totalItems > 0) {
            cartBadge.innerText = totalItems;
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    }

    // Llamamos en la carga inicial de cualquier página
    updateCartBadge();

    // ============================================
    // 1. LÓGICA DE LA DETALLE DE PRODUCTO (AGREGAR)
    // ============================================
    const buyForm = document.querySelector('.buy-form');
    if (buyForm) {
        console.log("👉 Formulario de compra detectado en detalle de producto.");
        buyForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Interceptamos para guardar en localStorage

            const id = document.querySelector('#prod-id').value;
            const name = document.querySelector('#prod-name').value;
            const price = parseFloat(document.querySelector('#prod-price').value) || 0;
            const image = document.querySelector('#prod-image').value;
            const quantity = parseInt(document.querySelector('input[name="quantity"]').value) || 1;
            const color = document.querySelector('select[name="color"]').value || 'Estándar';

            let cart = JSON.parse(localStorage.getItem(storageKey)) || [];

            // Comprobamos si el mismo producto con el mismo color ya existe
            const existingIndex = cart.findIndex(item => item.id === id && item.color === color);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += quantity;
            } else {
                cart.push({ id, name, price, image, quantity, color });
            }

            localStorage.setItem(storageKey, JSON.stringify(cart));
            console.log("📦 Producto agregado al localStorage para el usuario:", email);

            // Actualizamos el badge antes de irnos
            updateCartBadge();

            // Redirigimos a la vista de carrito
            window.location.href = '/products/cart';
        });
    }

    // ============================================
    // 2. LÓGICA DE LA PÁGINA DEL CARRITO (MOSTRAR)
    // ============================================
    const cartItemsContainer = document.querySelector('#cart-items-list');
    if (cartItemsContainer) {
        console.log("👉 Contenedor de listado de carrito detectado.");

        function renderCart() {
            const cart = JSON.parse(localStorage.getItem(storageKey)) || [];
            const layout = document.querySelector('.cart-layout');

            // Cada vez que renderizamos el carro, sincronizamos el badge del header
            updateCartBadge();

            if (cart.length === 0) {
                // Estado vacío: Reemplazamos la sección por un diseño estilizado
                if (layout) {
                    layout.innerHTML = `
                        <div style="text-align: center; padding: 60px 40px; background: #282c34; border-radius: 15px; border: 1px solid #4f5b66; width: 100%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <h2 style="color: #61dafb; margin-bottom: 20px; font-size: 2.2rem;">Tu carrito está vacío 🛒</h2>
                            <p style="color: #ccc; margin-bottom: 35px; font-size: 1.2rem;">Parece que aún no has agregado artículos a tu carrito de compras.</p>
                            <a href="/" class="btn-primary" style="display: inline-block; padding: 14px 40px; text-decoration: none; font-weight: bold; border-radius: 5px; color: white; background: var(--accent); border-color: var(--accent);">
                                VOLVER A COMPRAR
                            </a>
                        </div>
                    `;
                }
                return;
            }

            // Si hay elementos, limpiamos y renderizamos
            cartItemsContainer.innerHTML = '';
            let subtotal = 0;
            let totalItems = 0;

            cart.forEach((item, index) => {
                const itemSubtotal = item.price * item.quantity;
                subtotal += itemSubtotal;
                totalItems += item.quantity;

                const article = document.createElement('article');
                article.className = 'cart-item';
                article.style.display = 'flex';
                article.style.alignItems = 'center';
                article.style.justifyContent = 'space-between';
                article.style.padding = '15px';
                article.style.borderBottom = '1px solid #4f5b66';

                article.innerHTML = `
                    <div class="item-img" style="width: 80px; height: 80px; overflow: hidden; border-radius: 5px;">
                        <img src="/img/${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="item-info" style="flex: 2; margin-left: 20px; text-align: left;">
                        <h3 style="color: white; margin: 0; font-size: 1.1rem;">${item.name}</h3>
                        <p style="color: #61dafb; font-size: 0.85rem; margin: 3px 0 0 0;">Color: ${item.color}</p>
                        <p class="unit-price" style="color: #aaa; font-size: 0.9rem; margin: 3px 0 0 0;">Precio: $${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <div class="item-quantity" style="flex: 1; display: flex; align-items: center; gap: 5px; color: white;">
                        <label>Cant:</label>
                        <input type="number" class="qty-input" data-index="${index}" value="${item.quantity}" min="1" max="10" 
                               style="width: 55px; padding: 5px; background: #1c2025; border: 1px solid #4f5b66; color: white; border-radius: 5px; text-align: center;">
                    </div>
                    <div class="item-subtotal" style="flex: 1; text-align: right; color: white; font-weight: bold; font-size: 1.1rem;">
                        <p>$${itemSubtotal.toFixed(2)}</p>
                    </div>
                    <button class="btn-remove" data-index="${index}" style="background: none; border: none; color: #ff5252; cursor: pointer; font-size: 1.2rem; margin-left: 15px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(article);
            });

            // Calculamos Impuestos (ej: 9% aprox del subtotal)
            const taxes = subtotal * 0.0913;
            const total = subtotal + taxes;

            // Actualizamos la vista de Resumen del pedido
            document.querySelector('#cart-summary-subtotal-label').innerText = `Subtotal (${totalItems} ${totalItems === 1 ? 'ítem' : 'ítems'})`;
            document.querySelector('#cart-summary-subtotal').innerText = `$${subtotal.toFixed(2)}`;
            document.querySelector('#cart-summary-tax').innerText = `$${taxes.toFixed(2)}`;
            document.querySelector('#cart-summary-total').innerText = `$${total.toFixed(2)}`;

            // Event Listeners para Eliminar e Incrementar
            document.querySelectorAll('.btn-remove').forEach(button => {
                button.addEventListener('click', (e) => {
                    const buttonEl = e.target.closest('.btn-remove');
                    const indexToDelete = parseInt(buttonEl.getAttribute('data-index'));
                    
                    let currentCart = JSON.parse(localStorage.getItem(storageKey)) || [];
                    currentCart.splice(indexToDelete, 1);
                    localStorage.setItem(storageKey, JSON.stringify(currentCart));
                    
                    renderCart(); // Re-renderizamos
                });
            });

            document.querySelectorAll('.qty-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const newQty = parseInt(e.target.value);
                    if (newQty < 1) return;
                    
                    const indexToUpdate = parseInt(e.target.getAttribute('data-index'));
                    
                    let currentCart = JSON.parse(localStorage.getItem(storageKey)) || [];
                    currentCart[indexToUpdate].quantity = newQty;
                    localStorage.setItem(storageKey, JSON.stringify(currentCart));
                    
                    renderCart();
                });
            });
        }

        // Primera renderización al cargar
        renderCart();
    }
});
