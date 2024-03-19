<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

// Tabela a ser especificada na função
$nomeTabela = $_POST['nomeTabela'] ?? '';

// Conexão ao banco de dados
$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Consulta SQL para zerar os valores de todos os jogadores em uma tabela específica
$sql_update = "UPDATE $nomeTabela SET buys = 0, consumo = 0, fim = 0, pag = 0, cobranças = ''";

// Preparar a declaração
$stmt = $conn->prepare($sql_update);

// Verificar se a preparação foi bem-sucedida
if (!$stmt) {
    die("Erro na preparação da declaração: " . $conn->error);
}

// Executar a declaração
$result = $stmt->execute();

if ($result === false) {
    die("Erro ao executar a declaração: " . $stmt->error);
}

echo "Valores zerados com sucesso para todos os jogadores na tabela $nomeTabela.";

// Fechar a declaração e a conexão
$stmt->close();
$conn->close();
?>
