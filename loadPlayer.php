<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

    // Definir o modo de erro para exceção
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparar e executar a declaração SQL para obter todos os jogadores
    $stmt = $pdo->prepare("SELECT * FROM jogadores");
    $stmt->execute();

    // Obter os resultados como um array associativo
    $players = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Enviar os dados como resposta JSON
    header('Content-Type: application/json');
    echo json_encode($players);
} catch (PDOException $e) {
    // Em caso de erro
    echo "Erro ao carregar jogadores: " . $e->getMessage();
}
?>
