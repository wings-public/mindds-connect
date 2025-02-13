const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
var test = require('assert');
var bcrypt = require('bcrypt');
const Async = require('async');
const configData = require('../config/config.js');
var path = require('path');
const { app:{instance,logLoc} } = configData;
const {logger,loggerEnv} = require('../controllers/loggerMod');
const { db : {host,port,dbName,apiUserColl,apiUser, revokedDataCollection}} = configData;

const spawn  = require('child_process');
const getConnection = require('../controllers/dbConn.js').getConnection;
//const createApiUser = require('../controllers/userControllers.js').createApiUser;
const createTTLIndexExpire = require('../controllers/dbFuncs.js').createTTLIndexExpire;

//const { create } = require('domain');
var pid = process.pid;
var uDateId = new Date().valueOf();

var logFile = `entity-control-logger-${pid}-${uDateId}.log`;
//var logFile = loggerEnv(instance,logFile1);
var entityLog = logger('entity',logFile);

//const {default: PQueue} = require('p-queue');

// create a new queue, and pass how many you want to scrape at once


const initialize = async () => {
    //const getSuccess = new Promise( (resolve) => resolve("Success") );
    try {
        var resuser1 = await checkCollectionExists(apiUserColl);
        var resuser2 = await createCollection(apiUserColl);
    } catch(err) {
        console.log(`Collection ${apiUserColl} already exists`);
    }
    try {
        var retVal = await checkApiUser(apiUser);
        console.log("Logging the return value "+retVal);
        if ( retVal == "not_exists" ) {
            await createApiUser(apiUser);
        } else {
            console.log(`${apiUser} already exists`);
        }
    } catch(err) {
        console.log(err);
    }


    try {
        var client = getConnection();
        var res1 = await checkCollectionExists(revokedDataCollection);
        var res2 = await createCollection(revokedDataCollection);
        // create ttl index on expireAt field and expire documents at a specific clock time.
        var ttlVal = 0;
        var res3 = await createTTLIndexExpire(client,revokedDataCollection,ttlVal);
    } catch(err) {
        console.log(`Collection ${revokedDataCollection} or index already exists`);
    }

 

   



};

const initializeLogLoc = async() => {
    var logDir = path.join(logLoc,'import','samples','tmp');
    fs.mkdirSync(logDir,{recursive:true});
    return "created";
}

const checkApiUser = async (apiUser) => {
    var client = getConnection();
    const db = client.db(dbName);
    const collection = db.collection(apiUserColl);
    try {
        //var res1 = await checkCollectionExists(apiUserColl);
        //var res2 = await createCollection(apiUserColl);
        var doc = await collection.findOne({'user':apiUser});
        if ( doc ) {
            return "exists";
        } else {
            return "not_exists";
        }
        //return "Success";
    } catch(err1) {
        throw err1;
    }
};

const createApiUser = async (apiUser) => {
    try {
        var client = getConnection();
        const db = client.db(dbName);
        const collection = db.collection(apiUserColl);
        // Auto generate a salt and hash
        var hashPassword = bcrypt.hashSync(`${apiUser}@C#01`, 10);
        var data = {'_id':apiUser,'user':apiUser, 'hashPassword' : hashPassword,'createDate': Date.now()};
        
        var result = await collection.insertOne(data);
        test.equal(1,result.insertedCount);
        return "Success";
    } catch(err) {
        throw err;
    }
};






const readData = async (indId) =>  {
    var client = getConnection();
    const db = client.db(dbName);
    const collection = db.collection(individualCollection);
    var filter = {'_id':indId};
    //console.log("Filter that was set for Mongo is "+filter);
    //console.dir(filter,{"depth":null});
    try {
        var doc = await collection.findOne(filter);
        //console.log(doc);
        const getDoc = new Promise( ( resolve ) => resolve(doc) );
        //console.log("Check for the Promise return value. Success/Failure");
        //console.log(getDoc);
        return await getDoc;
    } catch (e) {
        throw "Error";
    }
};


    var doc = {};
    doc['_id'] = jsonInd['IndividualID'];
    var meta = jsonInd['Meta'];

    // Retrieve the meta keys defined in the Individual JSON and create the document
    var metaKeys = Object.keys(meta);
    //console.log(metaKeys);
    for ( var kIdx in metaKeys ) {
        var keyName = metaKeys[kIdx];
        doc[keyName] = meta[keyName];
    } 
    return doc;
};*/

// Connect to MongoDB and check if the collection exists. Returns Promise
const checkCollectionExists = async (colName) => {
    var client = getConnection();
    const db = client.db(dbName);
    const getSuccess = new Promise( ( resolve ) => resolve("Success") );
    try {
        var items = await db.listCollections({name:colName}).toArray();
        test.equal(0,items.length);
        return await getSuccess;
    } catch(err) {
        throw err;
    }
};

// Create the Collection passed as argument. Returns Promise;
const createCollection = async (colName) => {
    var client = getConnection();
    const db = client.db(dbName);
    const getSuccess = new Promise ( (resolve) => resolve("Success") );
    try {
        var result = await db.createCollection(colName,{'w':1});
        return await getSuccess;
    } catch(err) {
        throw err;
    }
};

const getResultCollObj = async () => {
    try {
        var client = getConnection();
        const db = client.db(dbName);
        var resColl = db.collection(resultCollection);
        return resColl;
    } catch(err) {
        throw err;
    }
};



module.exports = { initialize,initializeLogLoc,checkApiUser,  readData, getResultCollObj  };


//module.exports = { initialize,initializeLogLoc,checkApiUser, storeMultiple, checkProband, updateData, readData, getAttrData, createDoc, createFamily, assignInd, addPedigree, showPedigree, updateRelative, updateFamily, getPIData, getFamily ,getResultCollObj, getUnassignedInd, checkIndFilter, removeRelative, getDefinedRelatives, getInheritanceData, getRelativeData , getFamilyPIData, unassignRelative ,checkTrioQueue, getTrioCodes,getTrioFamily,getTrioMeta,getTrioFamilyOld,updateFamilySid,trioQueue };
