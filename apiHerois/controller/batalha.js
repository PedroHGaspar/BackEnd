const herois = require('../model/herois')
const viloes = require('../model/viloes')

exports.batalhar = (req, res) => {

    const {idHeroi, idVilao} = req.body

    res.status(200).send({})
}