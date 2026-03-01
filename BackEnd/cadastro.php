<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$host = "localhost";
$db = "CadDados";
$user = "postgres";
$pass = "16241624";

try {
    $conn = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if (!$data) {
        echo json_encode(["message" => "Nenhum JSON recebido", "raw" => $input]);
        exit;
    }

    $sql = "INSERT INTO pessoas (nome, data_nascimento, cpf)
            VALUES (:nome, :data_nascimento, :cpf)";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':nome' => $data['nome'],
        ':data_nascimento' => $data['data_nascimento'],
        ':cpf' => $data['cpf']
    ]);

    echo json_encode(["message" => "Cadastro realizado com sucesso"]);

} catch (PDOException $e) {
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}