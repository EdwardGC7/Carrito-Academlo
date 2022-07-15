
const articulos = [
  {
    nombre: 'Hoodies',
    stock: 10,
    precio: 14.0,
    img: './img/featured1.png'
  },
  {
    nombre: 'Shirts',
    stock: 15,
    precio: 24.0,
    img: './img/featured2.png'
  },
  {
    nombre: 'Sweatshirts',
    stock: 20,
    precio: 24.0,
    img: './img/featured3.png'
  }

];

const articulosDiv = document.querySelector('.articulos') || [];
const shrinkItems = document.querySelectorAll('.article-div') || [];
const listaBtnLi = document.querySelectorAll('.products-filters li') || [];
const themeMode = document.querySelector('.theme-mode');
 
let articulosFiltrados = articulos;

document.addEventListener('DOMContentLoaded', () => {
  listarArticulosHTML(articulos);
});

for (let i = 0; i < listaBtnLi.length; i++) {
  listaBtnLi[i].addEventListener('click', (e) => {
    limpiarHTML();
    articulosFiltrados = articulos.filter((item) => item.nombre == e.target.getAttribute('valor'));
    if ( e.target.getAttribute('valor') == 'All') {
      listarArticulosHTML(articulos);
    }else{
      listarArticulosHTML(articulosFiltrados);
    }
  });
}

function listarArticulosHTML(itemList) {
  itemList.forEach( articulo => {
    const {nombre, stock, precio, img} = articulo;
    const row = document.createElement('div');
    row.innerHTML = `
    <article class="article-div shrink-items">
    <div class="articulos-div-img">
      <img src="${img}" alt="Hoodies" class="articulos-items-img">
    </div>
    <div class="item-info">
      <h2>$${precio}.00 <span>| Stock: ${stock}</span></h2>
      <h3>${nombre}</h3>
      <button>
        <i class="bx bx-plus btn-add-producto" nombre="${nombre}" stock="${stock}" precio="${precio}" img="${img}"></i>
      </button>
    </div>
    </article>
    `;
    articulosDiv.appendChild(row);
  })
}

function limpiarHTML() {
  while(articulosDiv.firstChild){
    articulosDiv.removeChild(articulosDiv.firstChild);
  }
}

themeMode.addEventListener('click', (e)=>{
  const body = document.querySelector('body');
  body.classList.toggle('theme-class');
  e.target.classList.toggle('bx-moon');
  e.target.classList.toggle('bx-sun');
});