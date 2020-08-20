const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/', (req, res) => {
  connection.query('SELECT doctor.id, doc_lastname, doc_firstname, doc_city, name pro_name FROM doctor JOIN profession ON doctor.profession_id=profession.id', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve doctors informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  connection.query('SELECT * FROM doctor WHERE doctor.id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve doctors informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.post('/', (req, res) => {

  connection.query('INSERT INTO doctor SET ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send('Error on insert doctor')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})


module.exports = router