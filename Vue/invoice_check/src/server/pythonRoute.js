const express = require('express')
const router =express.Router()
const { PythonShell } = require('python-shell')
router.get('/invoice_number', (req,res) => {
    PythonShell.run('./invoice_number.py', {}, (err, data) => {
        if(err){
            console.log(err)
            res.send("Back End Error")
        }else{
            res.send(data.join(""))
        }
    })
})

router.post('/invoice_content', (req,res) => {
    PythonShell.run('./invoice_content.py', { args:[req.body.date] }, (err, data) => {
      if(err){
        console.log(err)
        res.send({ 'data' : 'Back End Error' })
      }else{
        res.send({ 'data' : data })
      }
    })
})

module.exports = router