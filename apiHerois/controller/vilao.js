const viloes = require('../model/viloes')

exports.criar = (req, res) => {
    const vilao = req.body//obg json com o body com as informações
    viloes.push(vilao)
    res.status(201).send({message: "Vilão criado com sucesso!", viloes})//criou e foi add um novo registro
}