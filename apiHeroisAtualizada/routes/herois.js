const express = require('express')
const router = express.Router()
const controller = require('./../controllers/herois')

router.post('/cadastrar', controller.criar)

module.exports = router