<?php 
if ($_POST['accion'] == 'crear') {
    //creara un nuevo registro
    require_once('../funciones/bd.php');

    //validar las entradas
    $nombre = filter_var($_POST('nombre'), FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST('empresa'), FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST('telefono'), FILTER_SANITIZE_STRING);

    try {
        $stmt = $conexion->prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
        $respuesta = array(
            'respuesta' => 'correcto',
            'datos' => array(
                'nombre' => $nombre,
                'empresa' => $empresa,
                'telefono' => $telefono,
                'id_insertado' => $stmt->insert_id
            )
        );
        $stmt->close();
        $conexion->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}

if ($_GET['accion'] == 'borrar'){
    require_once('../funciones/bd.php');

    $id = filter_var($_GET('id'), FILTER_SANITIZE_NUMBER_INT);

    try {
        $stmt = $conexion->prepare("DELETE FROM contactos WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array (
                'respuesta' => 'correcto'
            );
        }

        $stmt->close();
        $conexion->close();
    } catch (Exception $e) {
        $respuesta = array (
            'error' =>$e->getMessage()
        );
    }
    echo json_encode($respuesta);
}

if ($_POST['accion'] == 'editar'){
    require_once('../funciones/bd.php');

    $nombre = filter_var($_POST('nombre'), FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST('empresa'), FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST('telefono'), FILTER_SANITIZE_STRING);
    $id = filter_var($_POST('id'), FILTER_SANITIZE_NUMBER_INT);
    
    try {
        $stmt = $conexion->prepare("UPDATE contactos SET nombre = ?, telefono = ?, empresa= ? WHERE id= ?");
        $stmt->bind_param("sssi", $nombre, $telefono, $empresa, $id);
        $stmt->excute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                'respuesta' => 'correcto'
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conexion->close();
    } catch (Exception $e) {
        $respuesta = array (
            'error' =>$e->getMessage()
        );
    }
    echo json_encode($respuesta);
}