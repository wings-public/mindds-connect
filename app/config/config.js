
var path = require('path');




var envPath = path.join(__dirname,'.env');

var dataConfig = require('dotenv').config({path : envPath});
console.log(process.env.NODE_ENV);
const env = process.env.NODE_ENV; // 'dev' or 'test'
console.log("Environment being set is "+env);

const dev = {
 app: {
   instance : env,
   expressPort : parseInt(process.env.DEV_EXPRESS_APP_PORT) || 443,
   privkey : process.env.DEV_PRIV_KEY || '',
   cert : process.env.DEV_CERT || '',
   certAuth : process.env.DEV_CA || '',
   centerName : process.env.CENTER_NAME || 'Unknown',
   releaseNum : process.env.RELEASE || 2.2,
   logLoc : process.env.LOG_PATH || '/logger' 
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 27017,
   dbName: process.env.DEV_DB_NAME || '',
   apiUser : process.env.DEV_API_USER || '',
   apiUserColl : process.env.MONGO_API_USER_COLL || 'apiUsers',
   revokedDataCollection : process.env.MONGO_REV_DATA || 'revData',
  }
};

const test = {
  app: {
    instance : env,
    expressPort : parseInt(process.env.TEST_EXPRESS_APP_PORT) || 443,
    privkey : process.env.TEST_PRIV_KEY || '',
    cert : process.env.TEST_CERT || '',
    certAuth : process.env.TEST_CA || '',
    centerName : process.env.CENTER_NAME || 'Unknown',
    releaseNum : process.env.RELEASE || 2.2,
    logLoc : process.env.LOG_PATH || '/logger' 
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    dbName: process.env.DEV_DB_NAME || 'sampleCatalog',
    apiUser : process.env.DEV_API_USER || '',
    apiUserColl : process.env.MONGO_API_USER_COLL || 'apiUsers',
    revokedDataCollection : process.env.MONGO_REV_DATA || '',
    fileMetaCollection : process.env.MONGO_FILE_META || '',
    hostMetaCollection : process.env.MONGO_INSTANCE_META || 'revData'
  }
 };


 const prod = {
  app: {
    instance : env,
    expressPort : parseInt(process.env.PROD_EXPRESS_APP_PORT) || 443,
    privkey : process.env.PROD_PRIV_KEY || '',
    cert : process.env.PROD_CERT || '',
    certAuth : process.env.PROD_CA || '',
    centerName : process.env.CENTER_NAME || 'Unknown',
    releaseNum : process.env.RELEASE || 1.0,
    logLoc : process.env.LOG_PATH || '/logger' 
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: parseInt(process.env.PROD_DB_PORT) || 27017,
    dbName: process.env.PROD_DB_NAME || 'sampleCatalog',
    apiUser : process.env.PROD_API_USER || 'UAApiUser',
    apiUserColl : process.env.MONGO_API_USER_COLL || 'apiUsers',
    revokedDataCollection : process.env.MONGO_REV_DATA || 'revData',
   }
 };


const config = {
 dev,
 test,
 prod
};

module.exports = config[env];
