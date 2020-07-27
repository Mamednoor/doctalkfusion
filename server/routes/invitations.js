const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/:id', (req, res) => {
  connection.query('SELECT invitation.id, subject, text, link, pa_firstname, pa_lastname FROM invitation JOIN patient ON patient.id=invitation.patient_id WHERE doctor_id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve doctors informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.get('/doctors/:id', (req, res) => {
  connection.query('SELECT subject, text, link, pa_firstname, pa_lastname FROM invitation JOIN patient ON patient.id=invitation.patient_id WHERE doctor_id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve doctors informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.get('/patients/:id', (req, res) => {
  connection.query('SELECT subject, text, link, doc_firstname, doc_lastname FROM invitation JOIN doctor ON doctor.id=invitation.doctor_id WHERE patient_id=?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve doctors informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.post('/', (req, res) => {
  connection.query('INSERT INTO invitation SET ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send('Error on insert invitation')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.delete('/', (req, res) => {
  connection.query('DELETE FROM invitation WHERE id=?', [req.body.id], (err, results) => {
    if (err) {
      res.status(500).send('Error on retrieve professions informations')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})


module.exports = router