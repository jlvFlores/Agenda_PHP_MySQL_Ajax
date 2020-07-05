<?php include 'inc/layout/header.php' ?>

<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="" id="contacto" action="#">
        <legend>Añada un Contacto <span>Todos los campos son obligatorios</span></legend>
        <div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input type="text" placeholder="Nombre Contacto" id="nombre">
            </div>
            <div class="campo">
                <label for="empresa">Empresa:</label>
                <input type="text" placeholder="Nombre Empresa" id="empresa">
            </div>
            <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input type="tel" placeholder="Nombre Contacto" id="telefono">
            </div>
        </div>
        <div class="campo enviar">
            <input type="submit" value="Añadir">
        </div>
    </form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
    
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar Contactos...">
    
        <p class="total-contactos"><span>2</span> Contactos</p>
    
        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Paco</td>
                        <td>UTT</td>
                        <td>1234567890</td>
                        <td>
                            <a href="#" class="btn-editar btn">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button  data-id="1" type="button" class="btn-borrar btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Paco</td>
                        <td>UTT</td>
                        <td>1234567890</td>
                        <td>
                            <a href="#" class="btn-editar btn">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button  data-id="1" type="button" class="btn-borrar btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Paco</td>
                        <td>UTT</td>
                        <td>1234567890</td>
                        <td>
                            <a href="#" class="btn-editar btn">
                                <i class="fas fa-pen-square"></i>
                            </a>
                            <button  data-id="1" type="button" class="btn-borrar btn">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php include 'inc/layout/footer.php' ?>