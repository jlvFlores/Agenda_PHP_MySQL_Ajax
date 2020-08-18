const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody'),
      inputBuscador = document.querySelector('#buscar');

eventListeners();

function eventListeners() {
    // t
    formularioContactos.addEventListener('submit', leerFormulario);

    // t
    if(listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    // t
    inputBuscador.addEventListener('input', buscarContactos);

    numeroContactos();
}

function leerFormulario(e) {
    e.preventDefault();
    
    // t
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;

    if(nombre === '' || empresa === '' || telefono === '') {
        // t
        mostrarNotificacion('campos obligatorios', 'error');
    } else {
        // t
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        // t

        if(accion === 'crear'){
            // t
            insertarBD(infoContacto);
        } else {
            // t
            // t
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}
// t
function insertarBD(datos){
    // t

    // t
    const xhr = new XMLHttpRequest();

    // t
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    // t
    xhr.onload = function() {
        if(this.status === 200) {
            // console.log(JSON.parse(xhr.responseText));
            // t
            const respuesta = JSON.parse(xhr.responseText);

            // t
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            // t
            const contenedorAcciones = document.createElement('td');
            
            // t
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            // t
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            // t
            contenedorAcciones.appendChild(btnEditar);

            // t
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');
            
            // t
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            // t
            contenedorAcciones.appendChild(btnEliminar);

            // t
            nuevoContacto.appendChild(contenedorAcciones);
            
            // t
            listadoContactos.appendChild(nuevoContacto);

            // t
            document.querySelector('form').reset();

            // t
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

            // t
            numeroContactos();
        }
    }

    // t
    xhr.send(datos)
}

function actualizarRegistro(datos) {
    //crear el objeto
    const xhr = new XMLHttpRequest();

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    // abrir la respuesta
    xhr.onload = function(){
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);
            
            if (respuesta.respuesta === 'correcto') {
                // mostrar notificacion de correcto
                mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
            } else {
                // hubo un error
                mostrarNotificacion('Hubo un error...', 'error');
            }
            // Despues de 3 segundos redireccionar
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }
    }

    // enviar la peticion
    xhr.send(datos);
}
// t
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar') ) {
        // Tomar el ID
        const id = e.target.parentElement.getAttribute('data-id');

        // console.log(id);
        // Prentar usuario
        const respuesta = confirm('¿Estás seguro (a) ?');

        if (respuesta) {
            // llamando a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            //leer la respuesta
            xhr.onload = function() {
                if(this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta == 'correcto') {
                        //eliminar el registro del DOM
                        console.log(e.target.parentElement.parentElement.parentElement);
                        e.target.parentElement.parentElement.parentElement.remove();
                        
                        //monstrar notificacion
                        mostrarNotificacion('Contacto eliminado', 'correcto');
                        //actualixa numero
                        numeroContactos();
                    } else {
                        //monstramos una notificacion
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }
            //enviar la peticion
            xhr.send();
        }
    }
}
// t
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // t
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    // t
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);

}
// buscador de registros
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll('tbody tr');

          registros.forEach(registro => {
              registro.style.display = 'none';

              if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 ){
                registro.style.display = 'table-row';
              }
              numeroContactos();
          })
}

//muetra numero de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
          contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row'){
            total++;
        }
    });

    // t
    contenedorNumero.textContent = total;
}