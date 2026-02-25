<?php
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

    // Mensagem de sucesso no console
    echo "✅ Conexão estabelecida com o banco de dados!\n";

    $data = json_decode(file_get_contents("php://input"), true);

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
    echo "❌ Erro de conexão: " . $e->getMessage() . "\n";
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}