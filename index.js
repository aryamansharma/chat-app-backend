const express = require('express');
const app = express();
const User = require('./models/user-model');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

// mongoose.connect(process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD), {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(port, () => {
    console.log(`Application running on ${port}`);
});