<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$playerId = $_POST['playerId'] ?? '';
$newConsumo = $_POST['newConsumo'] ?? '';
$nomeTabela = $_POST['nomeTabela'] ?? ''; // Novo parâmetro para o nome da tabela
$nomeTabela = str_replace(' ', '', $nomeTabela);

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

    // Definir o modo de erro para exceção
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Adicione mensagens de depuração
    error_log("Player ID: $playerId, New Consumo: $newConsumo");

    // Preparar e executar a declaração SQL de atualização na tabela específica
    $stmt = $pdo->prepare("UPDATE $nomeTabela SET consumo = ? WHERE id = ?");
    $stmt->execute([$newConsumo, $playerId]);

    // Sucesso
    echo "Consumo atualizado com sucesso!";
} catch (PDOException $e) {
    // Em caso de erro
    error_log("Erro ao atualizar o consumo: " . $e->getMessage());
    echo "Erro ao atualizar o consumo: " . $e->getMessage();
}
?>
