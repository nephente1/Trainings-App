
// npm install dotenv and then:
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'unsafe-inline'; img-src 'self' https:; font-src 'self' https://fonts.googleapis.com;");
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// connect to db
mongoose.connect(process.env.MONGO)
  .then(() => {
    // listen for requests 
    app.listen(process.env.PORT, () => {
      console.log('connected to db and listening for port Kasia', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log('error', error)
  })

// listen for requests 
// app.listen(process.env.PORT, () => {
//     console.log('Listening for port', process.env.PORT)
// })
