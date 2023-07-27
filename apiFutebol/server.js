const http = require('http')
const host = "localhost"
const port = 3000


const partidas = [

    { id: 1, partida: "Grêmio X Inter" },
    { id: 2, partida: "Fluminense X Santos" },
    { id: 3, partida: "Atlético Mineiro X Corinthians" },
    { id: 4, partida: "Internacional X São Paulo" },
    { id: 5, partida: "Flamengo X Palmeiras" },

]

const requestListener = (req, res) => {

    res.setHeader('Content-type', 'application/json')
    const url = decodeURI(req.url)

    if (url == '/partidas') {
        res.writeHead(200)
        res.end(JSON.stringify(partidas))
    } else {
        const nomeDoTime = url.replace('/', '')
        const partidasDoTime = partidas.filter((partida) => partida.partida.includes(nomeDoTime))
        console.log(nomeDoTime)
        res.writeHead(200)
        res.end(JSON.stringify(partidasDoTime))
    }

}




const server = http.createServer(requestListener) //criação do servidor
server.listen(port, host, () => {
    console.log(`Servidor dispononível na porta: ${port}`)
})
