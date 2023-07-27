const http = require('http');
const host = 'localhost';
const port = 3000;

//Executando as Reqs
const requestListener = function (req, res) {
    res.setHeader('Content-Type', "application/json")

    switch (req.url) {
        case '/livros':
            res.writeHead(200)
            res.end(JSON.stringify({ livros: [] }))
            break

        case '/autores':
            res.writeHead(200)
            res.end(JSON.stringify({ autores: [] }))
            break

        default:
            res.writeHead(200)
            res.end("Nada Encontrado")
    }
}

//Criando o servidor
const server = http.createServer(requestListener)

//Iniciando o servidor
server.listen(port, host, () => {
    console.log("Server Disponível");
})