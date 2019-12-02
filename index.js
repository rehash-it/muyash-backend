// const keys = require('./config/keys');
// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
// const mongoose = require('mongoose');
// const express = require('express');
// var cors=require('cors');
// const app = express();
// // app.use(express.static('./uploads/'));
// app. use ( '/uploads' , express .static('uploads') );
// // app.use(cors);
// require('./routes/index')(app);
// if (!keys.jwtPrivateKey) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }
// let dbUri = `mongodb://${keys.dbhost}:${keys.dbport}/${keys.dbname}`;

// const connect = (databaseUrl =dbUri) => {
//   return mongoose
//       .connect(databaseUrl)
//       .then(() => console.log('Database connected'))
//       .catch(err => console.error('Database connection failed', err));
// };
// connect();

// app.listen(keys.port, () => console.log(`Listening on port ${keys.port}...`));

const {Storage} = require('@google-cloud/storage');
const Joi = require('joi');
const keys=require('./config/keys');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const app = express();
app.use (express .static('uploads') );
app.use(cors());
require('./routes/index')(app);
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}
let dbUri = process.env.DATABASE_URL;

let credentials = process.env.GCP_STORAGE_CREDENTIALS;
const storage = new Storage({credentials: credentials});

const connect = (databaseUrl =dbUri) => {
  return mongoose
      .connect(databaseUrl)
      .then(() => console.log('Database connected'))
      .catch(err => console.error('Database connection failed', err));
};
connect();

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}...`));
