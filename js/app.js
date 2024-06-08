// Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gasto-ul');



// Eventos 
eventListener();
function eventListener() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto )
}


// Clases



// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('¿Cuál es su presupuesto?');

  if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
    window.location.reload();
  }

  console.log(presupuestoUsuario)
}