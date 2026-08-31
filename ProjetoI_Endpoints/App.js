/* ----------------------------------------------------------------------
  FATEC - ZONA SUL - Aula 31/08/26 - 3Sem - DSM
  NOME: Gabriela Cardoso dos Santos - gc14072006@gmail.com
  -----------------------------------------------------------------------
  DESCRIÇÃO: Servidor web nativo em Node.js, utilizando rotas e chamadas 
  assíncronas. A aplicação processa requisições de forma eficiente e sem 
  bloqueios, servindo diferentes páginas conforme a URL acessada.
  -----------------------------------------------------------------------
*/

// Carregar os módulos:
const http = require('http'); //Trata protocolo http
const url = require('url'); // Usado para url (end-points)
const fs = require('fs'); // Fille-system (acessar arquivos)

//Função para ler arquivo e enviar no response http:
function readFile(response, file) {

    // Fazer a leitura do arquivo de forma assincrona:
  fs.readFile(file, function (err, data) {
    // Após ler, escrever no response (http) o conteudo:
    response.end(data)
  });
}
 
// Aplicação isolada - com callback:
let callback = function (request, response) {

    // Faz o Parse da URL, separa os endpoints:
    let parts = url.parse(request.url);

    //Verificar os endpoints:
    if (parts.path == "/") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/index.html");
    } 
    
    // Endpoints para o perfil da Gabriela:
    else if (parts.path == "/gabriela") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/gabriela/index.html");
    }
    else if (parts.path == "/gabriela/sobre") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/gabriela/sobre.html");
    }
    else if (parts.path == "/gabriela/curriculo") {
        response.writeHead(200, { "Content-Type": "application/pdf" });
        readFile(response, "public/gabriela/curriculo.pdf");
    }

    // Endpoints para o perfil da Thalita:
    else if (parts.path == "/thalita") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/thalita/index.html");
    }
    else if (parts.path == "/thalita/sobre") {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/thalita/sobre.html");
    }
    else if (parts.path == "/thalita/curriculo") {
        response.writeHead(200, { "Content-Type": "application/pdf" });
        readFile(response, "public/thalita/curriculo.pdf");
    }

    // Projeto documentado no Pdf na rota:
    else if (parts.path == "/projeto") {
        response.writeHead(200, { 'content-type': 'application/pdf' });
        readFile(response, "projeto/DocumentaçãoProjeto1.pdf") 
    }

    // Erro 404 - Página não encontrada:
    else {
        response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        readFile(response, "public/erro404.html");
    }
}; 

// Criar o servidor http:
let server = http.createServer(callback);

// Configurar a porta de escuta do servidor:
server.listen(3000);
console.log("Servidor rodando em http://localhost:3000");