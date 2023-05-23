const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://devtony:solstice@solstice.koxurka.mongodb.net/\n';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));
