const express = require('express')
const router = express.Router()

const connection = require('../conf.js')

router.post('/doctor', (req, res) => {
  const {
    doc_email,
    do_password
  } = req.body
  console.log(req.body)
  connection.query(
    'SELECT * FROM doctor WHERE doc_email = ? AND do_password = ?', [doc_email, doc_password],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          errors: ['password or mail was wrong']
        })
      } else {
        if (results.length === 0) {
          return res.sendStatus(401)
        }
        return res.status(200).json(results[0])
      }
    }
  )
})

router.post('/patient', (req, res) => {
  const {
    pa_mail,
    pa_password
  } = req.body

  connection.query(
    'SELECT * FROM patient WHERE pa_mail = ? AND pa_password = ?', [pa_mail, pa_password],
    (err, results) => {
      if (err) {
        return res.status(400).json({
          errors: ['password or mail was wrong']
        })
      } else {
        if (results.length === 0) {
          return res.sendStatus(401)
        }
        return res.status(200).json(results[0])
      }
    }
  )
})

module.exports = router