const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const requestIp = require('request-ip');
const dotenv = require('dotenv');
const passport = require('passport');
const passportRule = require('./security/Passport');

dotenv.config();
const app = express();


app.use(requestIp.mw());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/v0/rate', require('./route/RateRouter'));
app.use('/api/v0/user', require('./route/UserRouter'));
app.use('/api/v0/account', require('./route/AccountRouter'));

mongoose
  .connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
    retryWrites: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    w: 'majority'
  })
  .then(() => {
    console.log('Success: Connected to database.');
    passportRule(passport);
    app.listen(process.env.PORT, () => {
      console.log(`Server has been started at ${process.env.PORT} port.`);
    });

  })

