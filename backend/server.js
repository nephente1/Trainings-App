
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

//"Content-Security-Policy", "default-src 'self';
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self'; style-src 'unsafe-inline'; img-src 'self' https:; font-src 'self' https://fonts.googleapis.com;");
  res.setHeader('Access-Control-Allow-Origin', '*'); // Zezwól na połączenia z Twojej aplikacji frontendowej
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS'); // Zezwól na określone metody HTTP
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Zezwól na określone nagłówki
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Zakończ zapytanie preflight z kodem 200
  }
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
