const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Getting all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await Product.findById(id, req.body)
    if (!response) throw Error('Something went wrong ')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

// Creating one
router.post('/create', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    size: req.body.size,
    price: req.body.price
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await Product.findByIdAndUpdate(id, req.body)
    if (!response) throw Error('Something went wrong ')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

// Edit
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await Product.findById(id, req.body)
    if (!response) throw Error('Something went wrong ')
    const updated = { ...response._doc, ...req.body }
    res.status(200).json(updated)
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

// Deleting One
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
    try {
        const removed = await Product.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.subscriber = subscriber
  next()
}

module.exports = router