<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

$playerId = $_POST['playerId'] ?? '';
$newFim = $_POST['newFim'] ?? '';
$nomeTabela = $_POST['nomeTabela'] ?? ''; // Novo parâmetro para o nome da tabela
$nomeTabela = str_replace(' ', '', $nomeTabela);
// Valide o ID e os novos dados conforme necessário

// Conexão ao banco de dados
$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta SQL para atualizar o campo "fim" do jogador na tabela específica
$sql_update = "UPDATE $nomeTabela SET fim = ? WHERE id = ?";

// Preparar a declaração
$stmt = $conn->prepare($sql_update);

// Verificar se a preparação foi bem-sucedida
if (!$stmt) {
    die("Erro na preparação da declaração: " . $conn->error);
}

// Vincular os parâmetros
$stmt->bind_param("is", $newFim, $playerId); // "is" indica que $newFim é um inteiro e $playerId é uma string

// Executar a declaração
$result = $stmt->execute();

if ($result === false) {
    die("Erro ao executar a declaração: " . $stmt->error);
}

if ($stmt->affected_rows > 0) {
    echo "Fim atualizado com sucesso.";
} else {
    echo "Nenhum jogador encontrado ou nenhum valor de 'fim' foi alterado.";
}

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
