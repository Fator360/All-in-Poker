<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$playerId = $_POST['playerId'] ?? '';
$newCredits = $_POST['newCredits'] ?? '';
$nomeTabela = $_POST['nomeTabela'] ?? ''; 
$nomeTabela = str_replace(' ', '', $nomeTabela);

// Conexão ao banco de dados
$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta SQL para atualizar os créditos do jogador na tabela específica
$sql_update = "UPDATE $nomeTabela SET buys = ? WHERE id = ?";

// Preparar a declaração
$stmt = $conn->prepare($sql_update);

// Verificar se a preparação foi bem-sucedida
if (!$stmt) {
    die("Erro na preparação da declaração: " . $conn->error);
}

// Vincular os parâmetros
$stmt->bind_param("is", $newCredits, $playerId); 

// Executar a declaração
$result = $stmt->execute();

if ($result === false) {
    die("Erro ao executar a declaração: " . $stmt->error);
}

if ($stmt->affected_rows > 0) {
    echo "Créditos atualizados com sucesso.";
} else {
    echo "Nenhum jogador encontrado ou nenhum crédito foi alterado.";
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
