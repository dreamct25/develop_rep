const { Router } = require('express')

const apiRoute = Router()

apiRoute.get('/',(req,res) => res.json({ message:'Hello API !' }))

module.exports = apiRoute