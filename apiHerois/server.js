const express = require('express')
const port = 3000
const bodyParser = require("body-parser")
const heroisRoutes = require('./routes/herois')
const viloes = require('./routes/viloes')

const app = express()

app.use(bodyParser.json()) //converte o corpo das reqs em json


app.use('/herois', heroisRoutes) //Cadastrando as rotas dos heróis
app.use('/viloes', viloes) //Cadastrando as rotas dos heróis

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})