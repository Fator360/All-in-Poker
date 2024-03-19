<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$playerId = $_POST['playerId'] ?? '';
$newCobranças = $_POST['newCobranças'] ?? '';
$nomeTabela = $_POST['nomeTabela'] ?? '';  
$nomeTabela = str_replace(' ', '', $nomeTabela);

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

    // Definir o modo de erro para exceção
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Adicione mensagens de depuração
    error_log("Player ID: $playerId, New Cobranças: $newCobranças");

    // Preparar e executar a declaração SQL de atualização na tabela específica
    $stmt = $pdo->prepare("UPDATE $nomeTabela SET cobranças = ? WHERE id = ?");
    $stmt->execute([$newCobranças, $playerId]);

    // Sucesso
    echo "Cobranças atualizadas com sucesso!";
} catch (PDOException $e) {
    // Em caso de erro
    error_log("Erro ao atualizar as cobranças: " . $e->getMessage());
    echo "Erro ao atualizar as cobranças: " . $e->getMessage();
}
?>
