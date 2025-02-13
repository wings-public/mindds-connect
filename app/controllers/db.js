const configData = require('../config/config.js');
const { db: { host, port, dbName } } = configData;
const url = 'mongodb://' + host + ':' + port + '/' + dbName;
var mongoose = require('mongoose');


mongoose.set('useCreateIndex',true);


var conn = mongoose.createConnection(url, {useNewUrlParser:true,family:4,useUnifiedTopology:true});

module.exports = conn;


