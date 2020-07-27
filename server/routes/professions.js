const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/', (req, res) => {
    connection.query('SELECT * FROM profession', [req.params.id], (err, results) => {
      if (err) {
        res.status(500).send('Error on retrieve professions informations')
        console.log(err)
      } else {
        res.json(results)
      }
    })
  })

  module.exports = router