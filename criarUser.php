<?php

$host = *****; 
$dbname = *****; 
$user = ******; 
$pass = ******; 

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    // Definir o modo de erro do PDO para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar se os parâmetros necessários estão definidos
    if (isset($_POST['nome'], $_POST['email'], $_POST['senha'], $_POST['pix'], $_POST['tabela'])) {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $pix = $_POST['pix'];
        $tabela = $_POST['tabela'];
        $telefone = $_POST['telefone'];
        $bloqueado = $_POST['bloqueado'];

        // Preparar e executar a declaração SQL de inserção na tabela 'users'
        $stmt = $pdo->prepare("INSERT INTO $tabela (nome, email, senha, pix, telefone, bloqueado) VALUES (?, ?, ?, ?, ?, ?)");

        // Usar bindParam para vincular os parâmetros e evitar problemas com caracteres especiais
        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $email);
        $stmt->bindParam(3, $senha);
        $stmt->bindParam(4, $pix);
        $stmt->bindParam(5, $telefone);
        $stmt->bindParam(6, $bloqueado);

        $stmt->execute();

        // Sucesso
        echo "Usuário adicionado com sucesso!";
    } else {
        // Caso algum dos parâmetros não esteja definido
        echo "Erro: Parâmetros inválidos ou ausentes.";
    }
} catch (PDOException $e) {
    // Em caso de erro
    echo "Erro ao adicionar o usuário: " . $e->getMessage();
}

?>
