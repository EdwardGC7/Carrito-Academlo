const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu-navegacion');
const menuItem = document.querySelectorAll('.home-btn');
const navBar = document.querySelector('header');
const cartItem = document.querySelector('.cart-item');
const cartNavegacion = document.querySelector('.cart-navegacion');
const cerrar = document.querySelectorAll('.close');


cartItem.addEventListener('click', (e)=>{
  cartNavegacion.classList.toggle('spread-cart');
});

menuButton.addEventListener('click', (e)=>{
  menu.classList.toggle('spread');
  if (window.scrollY > 500) {
    menuItem[1].classList.add('home-btn-selected');
    menuItem[0].classList.remove('home-btn-selected');
  }else{
    menuItem[0].classList.add('home-btn-selected');
    menuItem[1].classList.remove('home-btn-selected');
  }
});

window.addEventListener('click', e=>{
  if(menu.classList.contains('spread') && e.target != menuItem[0] && e.target != menuButton){
    menu.classList.toggle('spread');
  }
  if(cartNavegacion.classList.contains('spread-cart') && e.target != cartItem && e.target == cerrar[1]){
    cartNavegacion.classList.toggle('spread-cart');
  }
});

window.addEventListener("scroll", () => {
  navBar.classList.toggle('header-bg', window.scrollY > 70);
});

