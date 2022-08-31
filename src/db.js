const mongoose = require('mongoose');
const config = require('../config/config');

// Db connection
try {
  mongoose
    .connect(config.DB.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  // eslint-disable-next-line no-console
    .then(() => console.log('DB connection OK'));
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}
