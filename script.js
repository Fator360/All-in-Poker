var jogadores = [];
var newPlayer = {
    "nome": "",
    "pix": "",
    "numero": "",
    "buys": 0,
    "consumo": 0,
    "cobranças": "",
    "fim": 0,
    "pag": 0,
    "id": "",
    "img": "default.png"
}

var nome;
var pix;
var buyValue;
var cashProp;

const inputName = document.getElementById("addPlayerInput");
const inputNumber = document.getElementById("addPlayerInputNumber");
const inputPix = document.getElementById("addPlayerInputPix");
const errorMsg = document.getElementById("error");
const warningMsg = document.getElementById("warning");
const spanLogin = document.getElementById("span-login");
const spanSignUp = document.getElementById("span-signup");
const divLogin = document.getElementById("login");
const divSignUp = document.getElementById("sign-up");
const inputLoginEmail = document.getElementById("login-email");
const inputLoginSenha = document.getElementById("login-senha");
const inputSignUpNome = document.getElementById("signup-nome");
const inputSignUpEmail = document.getElementById("signup-email");
const inputSignUpSenha = document.getElementById("signup-senha");
const inputSignUpPix = document.getElementById("signup-pix");
const inputSignUpFone = document.getElementById("signup-fone");
const oauthWindow = document.getElementById("OAuth-window");
const mainWindow = document.getElementById("Main-window");
const botAddPlayer = document.getElementById("botAddPlayer");
const buysInput = document.getElementById("buysInput");
const propInput = document.getElementById("propInput");
const buttonSair = document.getElementById("sairBtn");
const textName = document.getElementById("text-name");

function zerarCookies() {
document.cookie = "zerar";
console.log(document.cookie);
location.reload();
}

botAddPlayer.addEventListener('click', function () {
        addPlayer();
    });

var buysTotal = 0;

var campoMod = "";

function getBuyValue(value){
    buyValue =  value;
    document.cookie = nome + "-" + pix + "-" + fone + "-" + buyValue;
    console.log(document.cookie);
    generateRepeatingGroup();
}

function getProp(){
 if(cashProp == undefined){
     cashProp = 1000;
     document.cookie = nome + "-" + pix + "-" + fone + "-" + buyValue + "-" + cashProp;
     location.reload();
 }else {
     propInput.value = cashProp;
 }
 
}

function setProp(value){
    document.cookie = nome + "-" + pix + "-" + fone + "-" + buyValue + "-" + value;
    location.reload();
}

function showOAuth(campo){
    if (campo == "login"){
        spanLogin.className = "OAuth-span";
        spanSignUp.className = "OAuth-span-unfocused";
        divLogin.style.display = "flex";
        divSignUp.style.display = "none";
    }else{
        spanLogin.className = "OAuth-span-unfocused";
        spanSignUp.className = "OAuth-span";
        divLogin.style.display = "none";
        divSignUp.style.display = "flex";
    }
}

function login() {
    const email = inputLoginEmail.value;
    
    obterUsuarioPorEmail(email)
        .then(usuario => {
            if(usuario.Bloqueado == 1){
                alert("Sua conta foi bloqueada. Entre em contato conosco em 699234-6305 para restaurar sua conta.");
            }else{
            var senha = inputLoginSenha.value;
            if (senha == usuario.Senha) {
                document.cookie = usuario.Nome + "-" + usuario.Pix + "-" + usuario.Telefone + "-5";
                getCookieValue();
                loadPlayersFromTable('jogadores_' + usuario.nome);
                generateRepeatingGroup();
                mainWindow.style.display = "block";
                oauthWindow.style.display = "none";
            } else if (senha !== usuario.senha){
                alert('Credenciais incorretas');
            }}
        })
        .catch(error => {
            console.error('Erro ao obter o usuário:', error.message);
            // Trate erros conforme necessário
            alert('Erro ao obter o usuário. Por favor, tente novamente.');
        });
        
}

function obterUsuarioPorEmail(email) {
    // Configuração da solicitação fetch
    const opcoes = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}`,
    };

    const url = 'fetchUser.php';

    // Envia a solicitação fetch
    return fetch(url, opcoes)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar a solicitação');
            }
            return response.json();
        })
        .then(usuario => {
            console.log('Usuário encontrado:', usuario);
            return usuario; // Retorna o usuário para o próximo passo
        });
}

function getCookieValue(){
    var cookies = document.cookie.split("-");
    nome = cookies[0];
    pix = cookies[1];
    fone = cookies[2];
    buyValue = cookies[3];
    cashProp = cookies[4];
    console.log(nome);
    console.log(pix);
    console.log(fone);
    console.log(buyValue);
    console.log(cashProp);
}

function cadastrarNovoUsuario() {
    var nome = inputSignUpNome.value;
    var email = inputSignUpEmail.value;
    var senha = inputSignUpSenha.value;
    var pix = inputSignUpPix.value;
    var fone = "55" + inputSignUpFone.value;
    var bloqueado = 0;

    if (nome == "" || email == "" || senha == "" || pix == "") {
        alert('Insira valores válidos');
    } else {
        document.cookie = nome + "-" + pix + "-" + fone;
        console.log(document.cookie);
        getCookieValue();

        const url = 'criarUser.php';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `nome=${nome}&email=${email}&senha=${senha}&pix=${pix}&tabela=users&telefone=${fone}&bloqueado=${bloqueado}`,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar o pedido');
                }
                return response.text();
            })
            .then(result => {
                console.log('Resposta do servidor após adicionar usuário:', result);

                criarTabelaJogadores(nome);
                loadPlayersFromTable('jogadores_' + nome);
                console.log(jogadores);
                generateRepeatingGroup();
                mainWindow.style.display = "block";
                oauthWindow.style.display = "none";
            })
            .catch(error => {
                console.error('Erro ao enviar o pedido:', error);
            });
    }
}


function criarTabelaJogadores(nomeUsuario) {
    const url = 'criarTabela.php'; 

    // Configuração da solicitação fetch
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nomeUsuario=${nomeUsuario}`,
    };

    // Envia a solicitação fetch
    fetch(url, options)
        .then(response => response.text())
        .then(result => {
            console.log('Resposta do servidor:', result);
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
        });
}



function filtrarNumeros(str) {
    return str.replace(/\D/g, '');
}

function hideWarning(){
    warningMsg.style.display = 'none';
}

function addPlayer() {
    let nomeCortado = nome.replace(/\s/g, '');
    nomeTabela = "jogadores_" + nomeCortado;
    if (inputName.value === "" || inputPix.value === "" || inputNumber.value === "") {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
        var numero = "55" + filtrarNumeros(inputNumber.value);
        newPlayer.nome = inputName.value;
        newPlayer.numero = numero;
        newPlayer.pix = inputPix.value;
        newPlayer.id = "id_" + newPlayer.nome;
        console.log('Novo jogador a ser adicionado:', newPlayer);

        const url = "criarPlayer.php";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tabela: nomeTabela,
                jogador: newPlayer
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar o pedido');
            }
            return response.text();
        })
        .then(result => {
            console.log('Resposta do servidor após adicionar jogador:', result);
            loadPlayersFromTable('jogadores_' + nome).then(() => {
                inputName.value = '';
                inputNumber.value = '';
                inputPix.value = '';
                generateRepeatingGroup();
            });
        })
        .catch(error => {
            console.error('Erro ao enviar o pedido:', error);
        });
    }
}

function loadPlayersFromTable(nomeTabela) {
    const url = 'carregarJogadores.php';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nomeTabela=${nomeTabela}`,
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                console.error('Erro ao carregar jogadores:', errorText);
                throw new Error('Erro ao carregar jogadores');
            });
        }
        return response.json();
    })
    .then(jogadoresImp => {
        jogadores = jogadoresImp;
        generateRepeatingGroup();
    })
    .catch(error => {
        console.error('Erro ao carregar jogadores:', error);
        throw error;
    });
}


function excluirPlayer(playerId) {
    // Configuração da solicitação fetch
    const opcoes = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `playerId=${playerId}&nomeTabela=jogadores_${nome}`, // Enviar o ID do jogador como parâmetro
    };

    // Envia a solicitação fetch
    const url = 'deletarPlayer.php'; 
    fetch(url, opcoes)  
        .then(response => response.text())
        .then(result => {
            console.log('Resposta do servidor:', result);
            loadPlayersFromTable("jogadores_" + nome).then(() => {
                generateRepeatingGroup();
            });
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
        });
}

function zerarValores() {
    // Configuração da solicitação fetch
    const opcoes = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nomeTabela=${'jogadores_' + nome}`, // Adiciona o parâmetro nomeTabela ao corpo da solicitação
    };

    
    const url = 'zerarPlayers.php';
    // Envia a solicitação fetch
    fetch(url, opcoes)
        .then(response => response.text())
        .then(result => {
            console.log('Resposta do servidor:', result);
            
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
            
        });

    sendMessageZerar();
    sendMessageZerarAdm()
    alert("Mensagem enviada com sucesso!")
    location.reload();
}

function atualizarInfo(campo, playerId, novoValor) {
    let url, bodyKey;

    switch (campo) {
        case 'Buys':
            url = 'atualizarBuys.php';
            bodyKey = 'newCredits';
            break;
        case 'Consumo':
            url = 'atualizarConsumo.php';
            bodyKey = 'newConsumo';
            break;
        case 'Cobranças':
            url = 'atualizarCobranças.php';
            bodyKey = 'newCobranças';
            break;
        case 'Fim':
            url = 'atualizarFim.php';
            bodyKey = 'newFim';
            break;
        default:
            console.error('Campo não reconhecido:', campo);
            return;
    }

    const body = `${bodyKey}=${novoValor.toString()}&playerId=${playerId}&nomeTabela=jogadores_${nome}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
    };

    fetch(url, options)
        .then(response => response.text())
        .then(result => {
            console.log('Resposta do servidor:', result);
            generateRepeatingGroup();
            console.log(novoValor);
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
        });
}

async function sendMessage(playerNumber, playerName, playerTotal, playerConsumo, playerCobranças, playerBuys, playerCash) {
    const GZAPPY_URL = 'https://api.gzappy.com/v1/message/send-message'; 
    const USER_TOKEN_ID = '**************'; 
    const INSTANCE_ID = '*****************'; 
    const INSTANCE_TOKEN = '********************'; 

    const response = await fetch(GZAPPY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_token_id': USER_TOKEN_ID
      },
      body: JSON.stringify({
        instance_id: INSTANCE_ID,
        instance_token: INSTANCE_TOKEN,
        message: [playerName + ", você está devendo R$" + playerTotal + " da última partida do poker ("+ "Buys: " + playerBuys + "= R$" + playerBuys * parseFloat(buyValue) + playerCobranças + "). Faça o pix para " + pix + "."],
        phone: ["***********", playerNumber]
      })
    })

const data = await response.json()
alert("Cobranças enviada com sucesso!");
console.log(data)

}

async function sendMessageZerar() {
    const GZAPPY_URL = 'https://api.gzappy.com/v1/message/send-message'; 
    const USER_TOKEN_ID = '***************'; 
    const INSTANCE_ID = '*********************';
    const INSTANCE_TOKEN = '****************';

    const response = await fetch(GZAPPY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user_token_id': USER_TOKEN_ID
      },
      body: JSON.stringify({
        instance_id: INSTANCE_ID,
        instance_token: INSTANCE_TOKEN,
        message: [nome + ", obrigado por usar o All-in. Por essa rodada você está devendo R$" + buysTotal + ". PIX: matheuscahu@gmail.com. Pague em até três dias úteis para não ter sua conta bloqueada"],
        phone: ["**********", fone]
      })
    })

const data = await response.json();
console.log(data)

}


function addCreditos(idCredito, idPlayer){
    campoMod = 'buys';
    console.log(idPlayer);
    var h2Pag = document.getElementById('pag' + idPlayer);
    var h2Credito = document.getElementById(idCredito);[]
    var buys = parseInt(h2Credito.innerHTML);
    buys += 1;
    console.log(buys);
    atualizarInfo("Buys",idPlayer, buys);
    location.reload();
}

function subCreditos(idCredito, idPlayer){
    campoMod = 'buys';
    console.log(idPlayer);
    var h2Credito = document.getElementById(idCredito);
    var buys = parseInt(h2Credito.innerHTML);
    buys -= 1;
    console.log(buys);
    atualizarInfo("Buys",idPlayer, buys);
    location.reload();
}

function showInput(idInput) {
    var input = document.getElementById(idInput);
    if (input.style.display === 'none') {
        input.style.display = 'flex';
    } else {
        input.style.display = 'none';
    }
}

function showDelete(idSection, idInfo){
    var deleteSection = document.getElementById(idSection);
    var infoSection = document.getElementById(idInfo);
    infoSection.style.display = 'none';
    deleteSection.style.display = 'block';
}

function hideDelete(idSection, idInfo){
    var deleteSection = document.getElementById(idSection);
    var infoSection = document.getElementById(idInfo);
    infoSection.style.display = 'block';
    deleteSection.style.display = 'none';
}

function showConfirm(idSection, idH2, idCobrança, idValor){
    var confirmSection = document.getElementById(idSection);
    confirmSection.style.display = 'block';
    var confirmH2 = document.getElementById(idH2);
    var cobrançaNome = document.getElementById(idCobrança).value;
    var cobrançaValor = document.getElementById(idValor).value;
    confirmH2.innerHTML = "Gostaria de confirmar a cobrança " + cobrançaNome + " de " + cobrançaValor + "?";
}

function hideConfirm(idSection){
    var confirmSection = document.getElementById(idSection);
    confirmSection.style.display = 'none';
}

function cobrancas(consumo, idInputValor, idInputCobranca, idPlayer, cobranças) {
    var valor = document.getElementById(idInputValor).value;
    var nomeCobranca = document.getElementById(idInputCobranca).value;
    cobranças = cobranças + "-" + nomeCobranca + "-R$" + valor;

    console.log("Valor:", valor);
    console.log("Nome da Cobrança:", nomeCobranca);
    console.log("Cobranças Atuais:", cobranças);

    consumo += parseFloat(valor);
    atualizarInfo('Consumo', idPlayer, consumo);
    atualizarInfo('Cobranças', idPlayer, cobranças);
}



function generateRepeatingGroup() {
    const repeatingGroup = document.getElementById('repeatingGroup');
    repeatingGroup.innerHTML = '';
    jogadores.forEach(function (item) {
        var pag = parseFloat(item.buys) * parseFloat(buyValue) + parseFloat(item.consumo) - parseFloat(item.fim) / parseFloat(cashProp);
        console.log(item.buys + buyValue + item.consumo + item.fim + cashProp);
        console.log(pag);
        console.log(item.numero);
        console.log(item.Id);
        console.log(item.cobranças);
        buysTotal += parseInt(item.buys);
        console.log(buysTotal);
        var itemDiv = document.createElement('div');
        itemDiv.className = 'cartaoPlayer';
        itemDiv.innerHTML = `
            <img src="${item.img}" style="border-radius:50%"></img>
            <h2>${item.nome}</h2>
            <h3>PIX: ${item.pix}</h3>
            <div id="info_${item.Id}">
            <div class="creditos">
            <h2>Buy:</h2><button class="buttonMinus" onclick="subCreditos('creditos${item.Id}','${item.Id}')">-</button><h2 id="creditos${item.Id}">${item.buys}</h2><button class="buttonAdd" onclick="addCreditos('creditos${item.Id}', '${item.Id}')">+</button>
            </div>
            <h2 onclick="showInput('div_input_consumo_${item.Id}','Consumo')">Consumo: R$ ${item.consumo} ✏️</h2>
            <div id="div_input_consumo_${item.Id}" class="input_mod" style="display: none; flex-direction: column; justify-content: center; align-items: center">
            <input type="text" id="input_cobranca_${item.Id}" class="inputAlter" placeholder="Nome da cobrança" style="margin-bottom: 20px"></input>
            <input type="number" id="input_consumo_${item.Id}" class="inputAlter" placeholder="Valor" style="margin-bottom: 20px"></input>
            <button class="zerarButton" onclick="showConfirm('div_consumo_confirmação_${item.Id}', 'h2_confirmação_${item.Id}', 'input_cobranca_${item.Id}', 'input_consumo_${item.Id}')" style="justify-content: center">Salvar</button>
            </div>
            <div id="div_consumo_confirmação_${item.Id}" style= "display: none">
            <h2 id="h2_confirmação_${item.Id}"></h2>
            <button class="buttonSim" onclick="cobrancas(${item.consumo}, 'input_consumo_${item.Id}','input_cobranca_${item.Id}', '${item.Id}', '${item.cobranças}')" style="justify-content: center">Confirmar</button>
            <button class="buttonNao" onclick="hideConfirm('div_consumo_confirmação_${item.Id}')">Cancelar</button>
            </div>
            <h2 onclick="showInput('div_input_fim_${item.Id}','Fim')">Cashgame: ${item.fim} ✏️</h2>
            <div id="div_input_fim_${item.Id}" class="input_mod" style="display: none">
            <input type="number" id="input_fim_${item.Id}" class="inputAlter" onchange="atualizarInfo('Fim','${item.Id}', this.value)"></input>
            </div>
            <h2 id="total_${item.Id}">A pagar: R$ ${parseFloat(pag)}</h2>
            <div id="mod_${item.Id}" class="input_mod">
            <button class="solicitarButton" onclick="sendMessage('${item.numero}', '${item.nome}', ${parseFloat(item.buys) * buyValue + parseFloat(item.consumo) - parseFloat(item.fim) / cashProp}, '${item.consumo}', '${item.cobranças}', '${item.buys}', '${item.fim}')">Solicitar Pagamento</button>
            <button class="deleteButton" onclick="showDelete('deleteSection_${item.Id}','info_${item.Id}')">DELETAR</button>
            </div>
            </div>
            <div id = "deleteSection_${item.Id}" style="display: none">
            <span class="deleteSpan"><h2>Tem certeza que quer deletar esse jogador?</h2></span>
            <div style="display: flex; justify-content: space-around; margin-bottom: 20px"><button class="buttonSim" onclick="excluirPlayer('${item.Id}')">Sim</button><button class="buttonNao" onclick="hideDelete('deleteSection_${item.Id}','info_${item.Id}')">Não</button></div>
            </div>
        `;
        repeatingGroup.appendChild(itemDiv);
        console.log(pag);
        if (pag < 0){
            document.getElementById('total_' + item.Id).innerHTML = "A receber: R$ " + pag*-1;
        }
        
    });
}

            
function init() {
    cookies = document.cookie.split("-");
    if (document.cookie == "" || cookies[0] == "zerar") {
        mainWindow.style.display = 'none';
    } else {
        getCookieValue();
        propInput.value = cashProp;
        getProp();
        oauthWindow.style.display = 'none';
        mainWindow.style.display = 'block';
        loadPlayersFromTable("jogadores_" + nome);
        generateRepeatingGroup();
        buysInput.value = buyValue;
        propInput.value = cashProp;
        textName.innerHTML = "Você está logado como " + nome;
    }
}

window.onload = init;