const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const config=require('config');
const { error } = require('joi/lib/types/lazy');
const errorv = require('./middleware/errorv');


const app = express();
require('./prod')(app);
if(!config.get('jwtPrivteKey')){
  console.error('ferffe');
  process.exit()
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(errorv)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));