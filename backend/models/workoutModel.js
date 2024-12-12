const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)
