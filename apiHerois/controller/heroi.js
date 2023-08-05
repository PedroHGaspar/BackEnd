const herois = require('../model/herois')

exports.criar = (req, res) => {
    const heroi = req.body//obg json com o body com as informações
    herois.push(heroi)
    res.status(201).send({message: "Herói criado com sucesso!", herois})//criou e foi add um novo registro
}