const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  name: { //menu
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  numberofunit: { //numfoglass
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  collection: 'history'
})

module.exports = mongoose.model('History', historySchema)