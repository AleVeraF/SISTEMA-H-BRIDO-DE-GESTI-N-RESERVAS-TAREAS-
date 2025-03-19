// Función para manejar el envío del formulario
function manejarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value; 
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const numeroPersonas = document.getElementById('numero-personas').value;

    if (!nombre || !fecha || !hora || !numeroPersonas) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (fecha < new Date().toISOString().split('T')[0]) {
        alert('La fecha no puede ser anterior a hoy.');
        return;
    }

    const nuevaReserva = {
        id: Date.now(), 
        nombre,
        fecha,
        hora,
        numeroPersonas,
    };

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    reservas.push(nuevaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert('Reserva guardada exitosamente.');


    event.target.reset();

    mostrarReservas();
}

// Función para mostrar las reservas en la tabla
function mostrarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const tablaReservas = document.getElementById('tabla-reservas').getElementsByTagName('tbody')[0];
    
    // Limpiar la tabla antes de agregar las nuevas filas
    tablaReservas.innerHTML = '';

    reservas.forEach(reserva => {
        const fila = document.createElement('tr');

        // Crear celdas para cada reserva
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = reserva.nombre;
        const celdaFecha = document.createElement('td');
        celdaFecha.textContent = reserva.fecha;
        const celdaHora = document.createElement('td');
        celdaHora.textContent = reserva.hora;
        const celdaPersonas = document.createElement('td');
        celdaPersonas.textContent = reserva.numeroPersonas;
        const celdaAcciones = document.createElement('td');
        
        // Crear botón de eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarReserva(reserva.id);
        celdaAcciones.appendChild(botonEliminar);

        // Añadir las celdas a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaHora);
        fila.appendChild(celdaPersonas);
        fila.appendChild(celdaAcciones);

        // Añadir la fila a la tabla
        tablaReservas.appendChild(fila);
    });
}

// Función para eliminar una reserva
function eliminarReserva(id) {
    // Obtener las reservas del localStorage
    let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    // Filtrar las reservas para eliminar la seleccionada
    reservas = reservas.filter(reserva => reserva.id !== id);

    // Guardar las reservas actualizadas en localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Actualizar la vista
    mostrarReservas();
}

// Al cargar la página, mostrar las reservas almacenadas
document.addEventListener('DOMContentLoaded', mostrarReservas);

// Agregar el evento al formulario
document.getElementById('formulario-reserva').addEventListener('submit', manejarFormulario);


// Mostar/Ocultar secciones hacienco clic en el menu
// Hacemos 2 arrays, uno para los enlaces y otro para las secciones
// Recorremos los enlaces y les asignamos un evento click
// Al hacer clic, obtenemos el ID de la sección correspondiente
// Llamamos a la función mostrarSeccion con ese ID
// La función mostrarSeccion oculta todas las secciones
// y muestra la sección correspondiente al ID recibido
// Al cargar la página, mostramos la primera sección por defecto
document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll("nav a");
    const secciones = document.querySelectorAll("main > section");

    // Mostrar la primera sección por defecto
    secciones[0].style.display = "block";
  
    function mostrarSeccion(id) {
      // Ocultar todas las secciones
      secciones.forEach((seccion) => {
        seccion.style.display = "none";
      });

      

      
  
      // Mostrar la sección correspondiente
      // Buscamos la sección por ID
      // Si la encontramos, la mostramos
      // Si no la encontramos, no hacemos nada
      // Esto evita errores si el ID no existe
      // o si el ID no corresponde a una sección
      const seccionActiva = document.getElementById(id);
      if (seccionActiva) {
        seccionActiva.style.display = "block";
      }
    }
  
    // Asignar evento a cada enlace
    enlaces.forEach((enlace) => {
      enlace.addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        const id = enlace.getAttribute("href").substring(1); // Obtener el ID de la sección
        mostrarSeccion(id);
      });
    });
  });