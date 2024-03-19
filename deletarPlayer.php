<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$playerId = $_POST['playerId'] ?? '';
$nomeTabela = $_POST['nomeTabela'] ?? '';
$nomeTabela = str_replace(' ', '', $nomeTabela);

// Valide o ID, evite SQL injection e outras vulnerabilidades de segurança

// Conexão ao banco de dados
$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta SQL para excluir o pedido correspondente usando declaração preparada
$sql_delete = "DELETE FROM $nomeTabela WHERE id = ?";

// Preparar a declaração
$stmt = $conn->prepare($sql_delete);

// Verificar se a preparação foi bem-sucedida
if (!$stmt) {
    die("Erro na preparação da declaração: " . $conn->error);
}

// Vincular o parâmetro
$stmt->bind_param("s", $playerId); // "s" indica que $playerId é uma string

// Executar a declaração
$result = $stmt->execute();

if ($result === false) {
    die("Erro ao executar a declaração: " . $stmt->error);
}

if ($stmt->affected_rows > 0) {
    echo "Pedido excluído com sucesso.";
} else {
    echo "Nenhum jogador encontrado ou erro ao excluir o pedido.";
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
