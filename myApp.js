const express = require('express');
const app = express();

helmet = require('helmet');
bcrypt = require('bcrypt');


// Version 1
// app.use(helmet.hidePoweredBy());
// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());

// timeInSeconds = 90*24*60*60;
// app.use(helmet.hsts({ maxAge: timeInSeconds ,  force : true}));

// app.use(helmet.dnsPrefetchControl());

// app.use(helmet.noCache());


// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'",'trusted-cdn.com'],
//   }
// }));

// Version 2 - simplify
timeInSeconds = 90*24*60*60;
app.use(helmet({
  hidePoweredBy: true,
  
  frameguard: {         // configure
    action: 'deny'
  },
 
  noSniff: true,
  xssFilter: true,
  ieNoOpen: true,

  hsts: { 
    maxAge: timeInSeconds ,
    force : true
  },

  dnsPrefetchControl: true,
  noCache: true,
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'",'trusted-cdn.com'],
    }
  },
}))






























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
