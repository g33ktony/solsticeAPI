const express = require('express');
const app = express();
const http = require('http');
const userRoutes = require('./app/routes/userRoutes');
const authRoutes = require('./app/routes/authRoutes');
require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
