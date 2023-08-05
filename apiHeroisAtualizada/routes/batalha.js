const express = require('express')
const router = express.Router()
const controller = require('./../controllers/batalha')

router.post('/', controller.batalhar)

module.exports = router