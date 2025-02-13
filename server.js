const jwt = require('jsonwebtoken');
const addRequestId = require('express-request-id')();
const morgan = require('morgan');
const spawn  = require('child_process');
const schedule = require('node-schedule');
const express = require('express');
const bodyParserConst = require('body-parser');
const {requestLogger, errorLogger}  = require('./app/controllers/loggerMiddleware.js');
var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
const helmet = require('helmet');
var sampleCatalog = require('./app/routes/samplecatalog.routes.js')//.sampleCatalog;
var samplecatalogindividual = require('./app/routes/samplecatalogindividual.routes.js')//.samplecatalogindividual;
var samplecataloghpos = require('./app/routes/samplecataloghpos.routes.js')//.samplecataloghpos;
var samplecatalogomim = require('./app/routes/samplecatalogomim.routes.js')//.samplecatalogomim;
var loginRoutes = require('./app/routes/loginRoutes.js').loginRoutes;
var createConnection = require('./app/controllers/dbConn.js').createConnection;
//require('./app/routes/samplecatalog.routes.js')(app);
//require('./app/routes/samplecatalogindividual.routes.js')(app);
//require('./app/routes/samplecataloghpos.routes.js')(app);
//require('./app/routes/samplecatalogomim.routes.js')(app);


const configData = require('./app/config/config.js');
const { app : {expressPort, privkey, cert, certAuth, releaseNum} } = configData;

var displayVersion = process.env.CENTER_NAME || 'Dev ';
var initialize = require('./app/controllers/entityController.js').initialize;
var initializeLogLoc = require('./app/controllers/entityController.js').initializeLogLoc;

console.log("Variable to resolve the path");
console.log("file path is  "+__filename);
console.log("Dir Path is "+__dirname);

// create express app
const app = express();
// EXPRESS_PORT will be provided from environment file for docker setup
//const EXPRESS_PORT = 8081;
//The order of middleware loading is important: middleware functions that are loaded first are also executed first
app.use(helmet({
    frameguard: {
      action: 'deny'
    }
  }));
  
  
app.use(express.json());

// START Morgan Logger
app.use(addRequestId);

morgan.token('id', function getId(req) {
    return req.id
});

//var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
var loggerFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';


app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));


// END Morgan Logger


app.use((req, res, next) => {
   
    if (req.headers && req.headers.authorization) {
      var tokenIp = req.headers.authorization;
    //if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
       //jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
       jwt.verify(tokenIp, 'RESTFULAPIs', (err, decode) => {
           console.log(err);
           //console.log(decode);
           if (err) {
             console.log("Encountered error in JWT Verification");
             req.jwtid = undefined;
             // pass the error to express.
             next(err);
           }
           //console.log("JWT Decoded.Process to next function");
           req.jwtid = decode;
           next();
       }); 
    } else {
        req.jwtid = undefined;
        next();
    }
  });
  
  // Specific endpoint in the route gets called based on the URL.
  // Pass express app to Individual Routes
  try {
    console.log("Routes initialization process");
      loginRoutes(app); //manca da aggiungere 
      app.use(requestLogger);
      sampleCatalog(app);
      samplecatalogindividual(app);
      samplecataloghpos(app);
      samplecatalogomim(app);
     
  } catch(err) {
      console.log("Error in routes "+err);
  }
  
  var httpsPort = expressPort;
  
  const privatekey = fs.readFileSync(privkey,'utf8');
  const certificate = fs.readFileSync(cert,'utf8');
  const ca = fs.readFileSync(certAuth,'utf8');
  
  const options = {
      key : privatekey,
      cert: certificate,
      ca: ca
  };
  
  var server = https.createServer(options,app).listen(httpsPort,async () => {
      var host = server.address().address;
      var port = server.address().port;
      console.log("host" + host);
      //server.setTimeout();
      try {
          console.log("Now we are in the create server location");
          // check and setup database collections        
          client = await createConnection();
          console.log("Created Main Client Connection");
          //console.log(client);
          // Initializing database Collections
          console.log("Calling initialize to create initial collections ");
          var data = await initialize();
      } catch (e) {
          console.log("Error is "+e);
          //process.exit(1);
      }
      try {
          var retVal = await initializeLogLoc();
      } catch(err1) {
          console.log("Error initializing log path for import "+err1);
      }
  
      console.log(`Individual Express app listening https://${host}:${port}`);
   });
   
    // Handle server errors
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      port = expressPort;
      const bind = typeof port === 'string'
        ? `Port ${port}`
        : `Port ${port}`;
    
      // handle specific listen errors
      switch (error.code) {
        case 'EACCES':
          console.log(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.log(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          console.log(error);
        // throw error;
      }
    });
  
  // error-handling middleware should be defined last, after the other app.use and route calls.
  
  app.use(errorLogger);
  app.get('/', (req, res) =>
      res.send(`${displayVersion} Version ${releaseNum} - Node and express server is running on port ${expressPort}`)
  );

/*
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to SampleCatalog Server"});
});




// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
}); */