const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const router = require('../routes/auth.routes');

const PORT = config.get('port') || 5000;
const app = express();

app.use('/api/auth', require('../routes/auth.routes'));
app.use('/api/auth', router);

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => {
      console.log(`App is running. Listening on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

start();
