<?php

$nomeUsuario = $_POST['nomeUsuario'];
$nomeUsuario = str_replace(' ', '', $nomeUsuario);

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Comando SQL para criar a tabela
$sql = "CREATE TABLE IF NOT EXISTS jogadores_$nomeUsuario (
    Id VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    pix VARCHAR(255) NOT NULL,
    buys VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    consumo DECIMAL(10, 2) NOT NULL,
    cobranças VARCHAR(255) NOT NULL,
    fim VARCHAR(255) NOT NULL,
    pag DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (Id)
)";

// Executa o comando SQL
if ($conn->query($sql) === TRUE) {
    echo "Tabela criada com sucesso!";
} else {
    echo "Erro na criação da tabela: " . $conn->error;
}

// Fecha a conexão
$conn->close();

?>
