const express = require('express');
const app = express();

const helmet = require('helmet');
const bcrypt = require('bcrypt');


// Version 1
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());

timeInSeconds = 90*24*60*60;
app.use(helmet.hsts({ maxAge: timeInSeconds ,  force : true}));

app.use(helmet.dnsPrefetchControl());

// app.use(helmet.noCache());


app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'",'trusted-cdn.com'],
  }
}));


const saltRounds = 12; // Secure cost factor

// Example usage: Hash a password (for demonstration)
const myPlaintextPassword = 'superSecret123';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
    // You can store this hash in your database
  }
});


// Version 2 - simplify

// app.use(helmet({
//   hidePoweredBy: true,
  
//   frameguard: {         // configure
//     action: 'deny'
//   },
 
//   noSniff: true,
//   xssFilter: true,
//   ieNoOpen: true,

//   hsts: { 
//     maxAge: 90*24*60*60 ,
//     force : true
//   },

//   dnsPrefetchControl: true,
//   noCache: true,
//   contentSecurityPolicy: {    // enable and configure
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'",'trusted-cdn.com'],
//     }
//   },
// }))






























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
