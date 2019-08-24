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

router.post('/', (req, res) => {
  const postData = req.body

  if (!postData.VIN || !postData.make || !postData.model || !postData.mileage) {
    res.status(400).json({ message: 'VIN, make, model, and mileage fields are required' })
  }else {
    db('cars').insert(postData)
      .then(ids => {
        db('cars').where({id: ids[0]})
          .then(newCar => {
            res.status(201).json(newCar)
          })
      })
      .catch(err => {
        res.status(500).json({ errorMessage: 'Failed to store new car' })
      })
  }
})

module.exports = router