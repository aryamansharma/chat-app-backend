const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.listen(port, () => {
    console.log(`Application running on ${port}`);
});