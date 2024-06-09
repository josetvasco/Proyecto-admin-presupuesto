// Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gasto-ul');



// Eventos 
eventListener();
function eventListener() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto )
}


// Clases
class Presupuesto {
  constructor( presupuesto ) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }
}

class UI {
  insertarpresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = presupuesto;
  }
}

// Instanciar
const ui = new UI();
let presupuesto;


// Funciones
function preguntarPresupuesto() {
  const presupuestoUsuario = prompt('¿Cuál es su presupuesto?');

  if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto)

  ui.insertarpresupuesto(presupuesto); 
}