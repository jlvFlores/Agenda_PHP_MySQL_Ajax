<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text" 
            placeholder="Nombre Contacto" 
            id="nombre" 
            value="<?php if(isset($contacto['nombre'])) {
                        echo ($contacto['nombre']);
                    } ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
            type="text" 
            placeholder="Nombre Empresa" 
            id="empresa"
            value="<?php if(isset($contacto['empresa'])) {
                        echo ($contacto['empresa']);
                    } ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
            type="tel" 
            placeholder="Telefono Contacto" 
            id="telefono"
            value="<?php if(isset($contacto['telefono'])) {
                        echo ($contacto['telefono']);
                    } ?>">
    </div>
</div>
<div class="campo enviar">
    <?php 
        if(isset($contacto['telefono'])) {
            $accion = 'editar';
            $textoBtn = 'Guardar';
        } else {
            $accion = 'crear';
            $textoBtn = 'Añadir';
        }
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id'])): ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php endif; ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>