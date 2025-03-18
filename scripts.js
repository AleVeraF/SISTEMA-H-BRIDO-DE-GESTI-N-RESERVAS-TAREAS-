// Función para manejar el envío del formulario
function manejarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value; 
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    if (!nombre || !fecha || !hora) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const nuevaReserva = {
        id: Date.now(), 
        nombre,
        fecha,
        hora,
    };

    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    reservas.push(nuevaReserva);

    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert('Reserva guardada exitosamente.');


    event.target.reset();
}

document.getElementById('formulario-reserva').addEventListener('submit', manejarFormulario);