// Variables y selectores 
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');
const resetPresupuesto = document.querySelector('#reset-presupuesto')

// Eventos 
eventListener();
function eventListener() {
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
  
  formulario.addEventListener('submit', agregarGasto);

  resetPresupuesto.addEventListener('click', resetearFormulario)
}


// Clases
class Presupuesto {
  constructor( presupuesto ) {
    this.presupuesto = Number(JSON.parse(localStorage.getItem('presupuesto')));
    this.restante = Number(presupuesto);
    this.gastos = llamarLocalStorage();
  }

  nuevoGasto(gasto) {
    this.gastos = [ ...this.gastos, gasto ];
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
    this.restante = this.presupuesto - gastado;
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter( gasto => gasto.id !== id);
    localStorage.setItem('gastos', JSON.stringify(this.gastos));
    this.calcularRestante();
  } 
}

class UI {
  insertarPresupuesto(cantidad) {
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

  agregarGastoListado(gasto) {
    this.limpiarHTML();

    gasto.forEach( gasto => {
      
      const { nombre, cantidad, id } = gasto;

      const nuevoGasto =document.createElement('LI');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id;

      nuevoGasto.innerHTML = ` ${nombre} <span class=" badge badge-primary badge-pill">$ ${cantidad}</span>`;

      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times;'
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      }
      nuevoGasto.appendChild(btnBorrar);

      gastoListado.appendChild(nuevoGasto);
    });
  }

  limpiarHTML() {
    while( gastoListado.firstChild ) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante) {
    document.querySelector('#restante').textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj) {
    const { presupuesto, restante } = presupuestoObj;

    const restanteDiv = document.querySelector('.restante');

    if( (presupuesto / 4) > restante ) {
      restanteDiv.classList.remove('alert-success', 'alert-warning');
      restanteDiv.classList.add('alert-danger');
    } else if( (presupuesto / 2) > restante) {
      restanteDiv.classList.remove('alert-success', 'alert-danger');
      restanteDiv.classList.add('alert-warning');
    } else {
      restanteDiv.classList.remove('alert-danger', 'alert-warning');
      restanteDiv.classList.add('alert-success');
    }

    if(restante <= 0 ) {
      ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
      formulario.querySelector('button[type="submit"]').disabled = true;
    } else {
      formulario.querySelector('button[type="submit"]').disabled = false;
    }
  }
}

// Instanciar
const ui = new UI();
let presupuesto;


// Funciones
function preguntarPresupuesto() {
  let presupuestoUsuario
  
  if( JSON.parse(localStorage.getItem('presupuesto')) === null ) {
    presupuestoUsuario = prompt('¿Cuál es su presupuesto?');

    if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
      window.location.reload();
    }
    
    localStorage.setItem('presupuesto', presupuestoUsuario);
  } else {
    llamarLocalStorage();
    presupuestoUsuario = localStorage.getItem('presupuesto', )
  }

  
  presupuesto = new Presupuesto(presupuestoUsuario);
  ui.insertarPresupuesto(presupuesto);
  presupuesto.calcularRestante()
  ui.actualizarRestante(presupuesto.restante);
  ui.comprobarPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();

  // Leer los datos del formulario
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value) ;

  if( nombre === '' || cantidad === '' ) {
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  } else if( cantidad <= 0 || isNaN(cantidad) ) {
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }

  const gasto = { nombre, cantidad, id: Date.now() } 

  presupuesto.nuevoGasto(gasto);

  ui.imprimirAlerta('Agregado!');

  const { gastos, restante } = presupuesto;
  ui.agregarGastoListado(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);

  formulario.reset();
}

function eliminarGasto(id) {
  presupuesto.eliminarGasto(id);
  const { gastos, restante } = presupuesto;
  ui.agregarGastoListado(gastos);
  ui.actualizarRestante(restante);
  ui.comprobarPresupuesto(presupuesto);
}

function llamarLocalStorage() {
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  ui.agregarGastoListado(gastos)
  return gastos;
}

function resetearFormulario() {
  localStorage.clear();
  location.reload();
}