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

// Função para buscar um usuário por e-mail na tabela "users"
function buscarUsuarioPorNome($conn, $nome)
{
    // Consulta SQL para buscar um usuário por e-mail
    $sql = "SELECT * FROM users WHERE nome = ?";
    
    // Preparar a declaração
    $stmt = $conn->prepare($sql);

    // Verificar se a preparação foi bem-sucedida
    if (!$stmt) {
        die("Erro na preparação da declaração: " . $conn->error);
    }

    // Vincular o parâmetro
    $stmt->bind_param("s", $nome);

    // Executar a declaração
    $stmt->execute();

    // Obter o resultado
    $result = $stmt->get_result();

    // Fechar a declaração
    $stmt->close();

    // Verificar se algum usuário foi encontrado
    if ($result->num_rows > 0) {
        // Retornar os dados do usuário como um array associativo
        return $result->fetch_assoc();
    } else {
        return null; // Nenhum usuário encontrado
    }
}

// Exemplo de uso (não necessário para a função ser chamada, apenas ilustrativo)
$nomeUsuario = $_POST['nome'] ?? '';
$usuarioEncontrado = buscarUsuarioPorNome($conn, $nomeUsuario);

// Retornar os dados do usuário como JSON (pode ser utilizado em uma chamada AJAX)
echo json_encode($usuarioEncontrado);

// Fechar a conexão
$conn->close();
?>
