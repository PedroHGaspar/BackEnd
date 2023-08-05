const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const heroisRoutes = require('./routes/herois')
const viloesRoutes = require('./routes/viloes')
const batalhaRoutes = require('./routes/batalha')

const app = express()
app.use(bodyParser.json())

// Cadastrando as rotas
app.use('/herois', heroisRoutes)
app.use('/viloes', viloesRoutes)
app.use('/batalha', batalhaRoutes)

app.listen(port, () => {
    console.log(`API de heróis rodando na porta: ${port}`)
})