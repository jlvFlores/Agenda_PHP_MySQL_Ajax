const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    //cuando el formulario de ediar o crear se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();

    // leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //2 parametros texto y clase
        mostrarNotification('Todos los campos son obligatorios', 'error');

        //mostrarNotification('Todos los campos estan llenos', 'exito');
    } else {
        //pasa la valiacion, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if(accion === 'crear'){
            //crearemos un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
        }
    }
}
/** Insertar en la base de datos via Ajax */
function insertarBD(datos) {
    //llamado Ajax

    //crear el objeto
    const xhr = new XMLHttpRequest();
   
    //abrir la conexion
    xhr.open('POST', 'inc/modelos/modelos-contacto.php', true);

    //pasar los datos
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta.empresa);
        }
    }

    //enviar los datos
    xhr.send(datos)


}

// Notificacion en pantalla
function mostrarNotification(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;


    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y Mostrar la notification
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');

            setTimeout(() =>{
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}
