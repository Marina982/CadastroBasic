<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: DELETE, GET");
header("Content-Type: application/json");

$host = "localhost";
$db = "CadDados";
$user = "postgres";
$pass = "16241624";

try {
    $conn = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if(isset($_GET['id'])){

        $id = $_GET['id'];

        $sql = "DELETE FROM pessoas WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        echo json_encode(["message" => "Pessoa deletada com sucesso"]);

    } else {
        echo json_encode(["message" => "ID não informado"]);
    }

} catch (PDOException $e) {
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}
?>