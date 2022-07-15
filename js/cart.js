
const cartNavContainer = document.querySelector('.cart-navegacion-container');
const cartNavContent = document.querySelector('#cart-navegacion-content');
const cartCounter = document.querySelector('.cart-counter');
const cartNavItems = document.querySelector('.cart-navegacion-values-items');
const cartValuesTotal = document.querySelector('.cart-navegacion-values-total');
const btnTrash = document.querySelectorAll('.btn-trash');
const btnPlus = document.querySelectorAll('.btn-plus');
const btnMinus = document.querySelectorAll('.btn-minus');
let articulosCarrito = [];
let contadorProductos = 0;

  cartNavContent.innerHTML = `
      <div>
        <img src="./img/empty-cart.png" alt="Empty cart" class="cart-navegacion-img">
        <h2>Your cart is empty</h2>
        <p>You can add items to your cart by clicking on the "+" button on the product page.</p>
      </div>`;

window.addEventListener('click', e=>{
  
  if (e.target.classList.contains('btn-add-producto')) {
    let coincidencia = false;

    let nombre = e.target.getAttribute('nombre');
    let stock = e.target.getAttribute('stock');
    let precio = e.target.getAttribute('precio');
    let img = e.target.getAttribute('img');

    if (articulosCarrito.length > 0) {
      for (let i = 0; i < articulosCarrito.length; i++) {
        if (nombre == articulosCarrito[i].nombre) {
          if (articulosCarrito[i].cantidad >= stock) {
            alert('No hay mas producto en stock');
          }else{
            articulosCarrito[i].cantidad++;
            contadorProductos++;
            actualizarCarrito(nombre);
          }
          coincidencia = true;
        }
      }
      
      if (coincidencia == false) {
          articulosCarrito.push({nombre:nombre, cantidad: 1, precio:precio, stock:stock});
          contadorProductos++;

          let row = document.createElement('div');
          row.innerHTML = `
              <div>
                <img src="${img}" alt="" >
              </div>
              <div>
                <h3 class="nombre-selector">${nombre}</h3>
                <span>Stock: ${stock} | <span class="cart-icon-red actualizar-precio">$${precio}.00</span></span>
                <span class="cart-icon-red actualizar-subtotal">
                  Subtotal: $${precio}.00
                </span>
                  <div class="cart-content-center">
                    <span>
                    <i class="bx bx-minus btn-minus" nombre="${nombre}"></i>
                    </span>
                    <span class="actualizar-unidades">1 units</span>
                    <span>
                    <i class="bx bx-plus btn-plus" nombre="${nombre}"></i>
                    </span>
                  </div>
              </div>
              <div class="cart-icon-red"> <i class="bx bx-trash-alt btn-trash" nombre="${nombre}"></i></div>
          `;
          cartNavContent.classList.add('cart-navegacion-content');
          cartNavContent.appendChild(row);
          coincidencia = false;
      }
      actualizarCarrito(nombre);

    }else{
      articulosCarrito.push({nombre:nombre, cantidad: 1, precio:precio, stock:stock});
      contadorProductos++;

      cartNavContent.innerHTML = '';
      let row = document.createElement('div');
          row.innerHTML = `
              <div>
                <img src="${img}" alt="" >
              </div>
              <div>
                <h3 class="nombre-selector">${nombre}</h3>
                <span>Stock: ${stock} | <span class="cart-icon-red actualizar-precio">$${precio}.00</span></span>
                <span class="cart-icon-red actualizar-subtotal">
                  Subtotal: $${precio}.00
                </span>
                  <div class="cart-content-center">
                    <span>
                    <i class="bx bx-minus btn-minus" nombre="${nombre}"></i>
                    </span>
                    <span class="actualizar-unidades">1 units</span>
                    <span>
                    <i class="bx bx-plus btn-plus" nombre="${nombre}"></i>
                    </span>
                  </div>
              </div>
              <div class="cart-icon-red"> <i class="bx bx-trash-alt btn-trash" nombre="${nombre}"></i></div>
          `;
          cartNavContent.classList.add('cart-navegacion-content');
          cartNavContent.appendChild(row);
          actualizarCarrito(nombre);
    }

    cartCounter.innerHTML = `${contadorProductos}`;
    cartNavItems.innerHTML = `<span>${contadorProductos}</span> items`;
  }

  // Actualizar cantidades

  if (e.target.classList.contains('btn-plus')) {
    actualizarCarrito(e.target.getAttribute('nombre'), 'sumar');
  }

  if (e.target.classList.contains('btn-trash')) {
    for (let i = 0; i < articulosCarrito.length; i++) {

      if (e.target.getAttribute('nombre') == articulosCarrito[i].nombre ) {
         while(articulosCarrito[i].cantidad > 1) {
          actualizarCarrito(e.target.getAttribute('nombre'), 'eliminar', e);
         }
         if (articulosCarrito[i].cantidad <= 1) {
           actualizarCarrito(e.target.getAttribute('nombre'), 'eliminar', e);
        }
      }
    }
  }

  if (e.target.classList.contains('btn-minus')) {
    actualizarCarrito(e.target.getAttribute('nombre'), 'reducir', e);
  }

});



function actualizarCarrito(elemento, accion='none', event = null) {
  const actualizarPrecio = document.querySelectorAll('.actualizar-precio');
  const actualizarSubtotal = document.querySelectorAll('.actualizar-subtotal');
  const actualizarUnidades = document.querySelectorAll('.actualizar-unidades');
  const nombreSelector = document.querySelectorAll('.nombre-selector');
  let totales = 0;
  let precioHelper = 0;
  let valorCadena = '';

  for (let i = 0; i < articulosCarrito.length; i++) {

    if ((accion == 'reducir' || accion == 'eliminar') && articulosCarrito[i].cantidad > 0  && articulosCarrito[i].nombre == elemento) {
      precioHelper = articulosCarrito[i].precio;
      articulosCarrito[i].cantidad--;
      contadorProductos--;
      cartCounter.innerHTML = `${contadorProductos}`;
      cartNavItems.innerHTML = `<span>${contadorProductos}</span> items`;

      if(articulosCarrito[i].cantidad == 0){
        articulosCarrito = articulosCarrito.filter(function(articulo) {
          return articulo.nombre !== elemento; 
        });
        cartCounter.innerHTML = `${contadorProductos}`;
        cartNavItems.innerHTML = `<span>${contadorProductos}</span> items`;

        try {
          totales = totales - precioHelper;
        } catch (error) {
        }

        if (accion == 'reducir') { 
          event.target.parentElement.parentElement.parentElement.parentElement.remove();
        }else if (accion == 'eliminar'){
          event.target.parentElement.parentElement.remove();
        }

    }    
    }

    try {
      if (accion == 'sumar' && articulosCarrito[i].cantidad < articulosCarrito[i].stock && articulosCarrito[i].nombre == elemento) {
        articulosCarrito[i].cantidad++;
        contadorProductos++;
        cartCounter.innerHTML = `${contadorProductos}`;
        cartNavItems.innerHTML = `<span>${contadorProductos}</span> items`;
      }
      if (elemento == articulosCarrito[i].nombre) {
        for (let j = 0; j < nombreSelector.length; j++) {
          if (nombreSelector[j].innerHTML == elemento) {
  
            actualizarPrecio[j].innerHTML = `$${articulosCarrito[i].precio}.00`;
            actualizarSubtotal[j].innerHTML = `Subtotal: $${articulosCarrito[i].precio * articulosCarrito[i].cantidad}.00`;
            actualizarUnidades[j].innerHTML = `${articulosCarrito[i].cantidad} units`;
          }
        }
      } 
    } catch (error) {
    }
  }

  for (let i = 0; i < actualizarSubtotal.length; i++) {
    valorCadena = actualizarSubtotal[i].innerHTML;
    valorCadena = valorCadena.replace('Subtotal: $', '');
    valorCadena = valorCadena.replace('.00', '');
    
    totales = totales + parseInt(valorCadena);
  }

  cartValuesTotal.innerHTML = `$${totales}.00`;

  if (articulosCarrito.length <= 0) {
    cartNavContent.classList.remove('cart-navegacion-content');
    cartNavContent.innerHTML = `
      <div>
        <img src="./img/empty-cart.png" alt="Empty cart" class="cart-navegacion-img">
        <h2>Your cart is empty</h2>
        <p>You can add items to your cart by clicking on the "+" button on the product page.</p>
      </div>`;
  }
  
}

