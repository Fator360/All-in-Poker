<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

// Conexão ao banco de dados
$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Obtém os dados enviados via JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados foram recebidos corretamente
if ($data && isset($data['tabela'], $data['jogador'])) {

    // Obtém os dados do jogador
    $jogador = $data['jogador'];

    // Verifica se as chaves do array estão definidas
    $nome = isset($jogador['nome']) ? $jogador['nome'] : '';
    $numero = isset($jogador['numero']) ? $jogador['numero'] : '';
    $pix = isset($jogador['pix']) ? $jogador['pix'] : '';
    $buys = isset($jogador['buys']) ? $jogador['buys'] : '';
    $img = isset($jogador['img']) ? $jogador['img'] : '';
    $id = isset($jogador['id']) ? $jogador['id'] : '';
    $consumo = isset($jogador['consumo']) ? $jogador['consumo'] : '';
    $cobranças = isset($jogador['cobranças']) ? $jogador['cobranças'] : '';
    $fim = isset($jogador['fim']) ? $jogador['fim'] : '';
    $pag = isset($jogador['pag']) ? $jogador['pag'] : '';

    // Prepara e executa a declaração SQL de inserção com instrução preparada
    $stmt = $conn->prepare("INSERT INTO {$data['tabela']} (nome, numero, pix, buys, img, id, consumo, cobranças, fim, pag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    // Verifica se a preparação foi bem-sucedida
    if (!$stmt) {
        die("Erro na preparação da declaração: " . $conn->error);
    }

    // Vincula os parâmetros
    $stmt->bind_param("ssssssssss", $nome, $numero, $pix, $buys, $img, $id, $consumo, $cobranças, $fim, $pag);

    // Executa a declaração
    $result = $stmt->execute();

    // Verifica se a execução foi bem-sucedida
    if ($result === false) {
        die("Erro ao executar a declaração: " . $stmt->error);
    }

    // Verifica se alguma linha foi afetada
    if ($stmt->affected_rows > 0) {
        echo "Jogador adicionado com sucesso!";
    } else {
        echo "Erro ao adicionar o jogador.";
    }

    // Fecha a declaração
    $stmt->close();
} else {
    // Se os dados não foram recebidos corretamente
    echo "Erro: Dados inválidos ou ausentes.";
}

// Fecha a conexão
$conn->close();

?>
