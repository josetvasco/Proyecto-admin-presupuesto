// Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gasto-ul');

// Eventos 
eventListener();
function eventListener() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto );
  
  formulario.addEventListener('submit', agregarGasto);
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
    document.querySelector('#restante').textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('text-center', 'alert');

    if( tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success')
    }

    divMensaje.textContent = mensaje;

    document.querySelector('.primario').insertBefore( divMensaje, formulario );

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);

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

function agregarGasto(e) {
  e.preventDefault();

  // Leer los datos del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  if( nombre === '' || cantidad === '' ) {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if( cantidad <= 0 || isNaN(cantidad) ) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }

  console.log('Agregrando gasto')
}