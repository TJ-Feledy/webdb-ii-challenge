const express = require('express')

const db = require('../data/dbConfig.js')

const router = express.Router()

router.get('/', (req, res) => {
  db('cars')
    .then(cars => {
      res.json(cars)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to retrieve cars' })
    })
})

router.get('/:id', (req, res) => {
  const {id} = req.params

  db('cars').where({id}).first()
    .then(car => {
      if (car) {
        res.json(car)
      }else {
        res.status(404).json({ message: 'Invalid car ID' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to retrieve the car' })
    })
})

module.exports = router