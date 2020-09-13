const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 5000;
const app = express();

const conf = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

app.use('/api/auth', require('../routes/auth.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      conf
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
