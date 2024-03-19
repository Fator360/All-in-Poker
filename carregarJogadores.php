<?php
// carregarJogadores.php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$nomeTabela = $_POST['nomeTabela'] ?? '';
$nomeTabela = str_replace(' ', '', $nomeTabela);

try {
    // Conexão ao banco de dados
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL para selecionar todos os jogadores da tabela especificada
    $sql = "SELECT * FROM $nomeTabela";

    // Preparar a declaração
    $stmt = $conn->prepare($sql);

    // Executar a declaração
    $stmt->execute();

    // Obter resultados
    $jogadores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorne os jogadores como resposta em formato JSON
    echo json_encode($jogadores);
} catch (PDOException $e) {
    // Em caso de erro, imprima a mensagem de erro
    echo "Erro ao conectar ao banco de dados: " . $e->getMessage();
}
?>
