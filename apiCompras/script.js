//Definindo o tipo de dados do corpo JSON
const bodyParser = require('body-parser')
const { append } = require('express/lib/response')
app.use(bodyParser.json())

//Mapeando os 4 métodos HTTP

app.get('/', (req, res) => {
    res.status(200).send({message: "Executou um GET"})
})

app.post('/', (req, res) => {
    const body = req.body
    res.status(200).send({message: "Executou um POST"})
})

app.put('/:id',(req, res) =>{
    const id = req.params.id
    res.status(200).send({message: "Executou um PUT"})
})

app.delete('/:id', (req,res) => {
    const id = req.params.id
    res.status(200).send({message: "Executou um DELETE"})
})