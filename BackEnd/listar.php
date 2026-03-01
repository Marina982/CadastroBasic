<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

$host = "localhost";
$db = "cadastro_db";
$user = "postgres";
$pass = "16241624";

try {
    $conn = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id, nome, data_nascimento, cpf FROM pessoas ORDER BY id ASC";
    $stmt = $conn->query($sql);
    $pessoas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($pessoas);

} catch (PDOException $e) {
    echo json_encode(["message" => "Erro: " . $e->getMessage()]);
}