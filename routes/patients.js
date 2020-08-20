const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM patient WHERE patient.id=?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Error on gey favorite patient doctor')
            console.log(err)
        } else {
            res.json(results)
        }
    })
})

router.get('/:pa_id/doctors/:doc_id', (req, res) => {
    connection.query('SELECT * FROM patient_doctor WHERE patient_id=? AND doctor_id=?', [req.params.pa_id, req.params.doc_id], (err, results) => {
        if (err) {
            res.status(500).send('Error on gey favorite patient doctor')
            console.log(err)
        } else {
            res.json(results)
        }
    })
})

router.get('/:pa_id/doctors/', (req, res) => {
    connection.query('SELECT patient_id, doctor_id id, doc_lastname, doc_firstname, doc_city, name pro_name FROM patient_doctor pado JOIN doctor ON pado.doctor_id=doctor.id JOIN profession ON doctor.profession_id=profession.id WHERE patient_id=?', [req.params.pa_id], (err, results) => {
        if (err) {
            res.status(500).send('Error on get all favorite patient doctor')
            console.log(err)
        } else {
            res.json(results)
        }
    })
})

router.post('/', (req, res) => {

  connection.query('INSERT INTO patient SET ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send('Error on insert patient')
      console.log(err)
      } else {
        res.json(results)
      }
    })
})

router.post('/doctors', (req, res) => {
    connection.query('INSERT INTO patient_doctor SET ?', [req.body], (err, results) => {
        if (err) {
            res.status(500).send('Error on insert favorite patient doctor')
            console.log(err)
        } else {
            res.json(results)
        }
    })
})

router.delete('/doctors', (req, res) => {
    connection.query('DELETE FROM patient_doctor WHERE patient_id=? AND doctor_id=? ', [req.body.patient_id, req.body.doctor_id], (err, results) => {
        if (err) {
            res.status(500).send('Error on delete favorite patient doctor')
            console.log(err)
        } else {
            res.json(results)
        }
    })
})

module.exports = router