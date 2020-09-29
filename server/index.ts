import express from 'express';
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('../routes/routes');
const note = require('../routes/note');

const PORT = 5001;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', router);
app.use('/api/note', note);

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
