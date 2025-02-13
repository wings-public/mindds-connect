const SampleCatalog = require('../models/sampleCatalog.model.js');
const CatalogIndidual = require('../models/catalogIndividual.model.js');
const getConnection = require('../controllers/dbConn.js').getConnection;
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
var test = require('assert');
var bcrypt = require('bcrypt');
const Async = require('async');

// Retrieve and return all samplecatalogs from the database.
exports.findAll = (req, res) => {
    CatalogIndidual.find()
    .then(individuals => {
        res.send(individuals);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


// Find a single samplecatalog with a samplecatalogId
exports.findOne = (req, res) => {
    CatalogIndidual.find( { "CatalogIndividualID": { $eq: req.params.CatalogIndividualID }} ).then(individual => {
        if(!individual) {
            return res.status(404).send({
                message: "Individual not found with id " + req.params.CatalogIndividualID
            });            
        }
        res.send(individual);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Individual not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Error retrieving individual with id " + req.params.SampleID_Catalog
        });
    });
};


//read one
exports.readData = async (indId) =>  {
    var client = getConnection();
    const db = client.db(dbName);
    const collection = db.collection(CatalogIndidual);
    var filter = {'CatalogIndividualID':indId};
    try {
        var doc = await collection.findOne(filter);
        const getDoc = new Promise( ( resolve ) => resolve(doc) );
        return await getDoc;
    } catch (e) {
        throw "Error";
    }
};

//all piid indiv
exports.getPIData = async(piid) => {


    //const collection = db.collection(colType);
    try {
        var obj = [];
        var filter = {};
        piid = parseInt(piid);
        console.log("Logging the piid provided as argument "+piid);
        if ( piid != -1 ) {
            // Get all the families belonging to the center
            filter = {"PIID" : piid};
        }
        var dStream = await CatalogIndidual.find(filter);
        for await(const doc of dStream) {
            obj.push(await doc);
        }

        return obj;
    } catch(err) {
        throw err;
    }
};

// Delete a samplecatalog with the specified samplecatalogId in the request
exports.delete = (req, res) => {
    CatalogIndidual.deleteOne({ CatalogIndividualID: { $eq: req.params.CatalogIndividualID } })
    .then(individual => {
        
        if(!individual) {
            return res.status(404).send({
                message: "Individual not found with id " + req.params.CatalogIndividualID
            });
        }


        res.send({message: "Note deleted successfully!"});
        CatalogIndidual.find({ CatalogIndividualID: { $eq: individual.CatalogIndividualID }}, function(err,result){
            if(!result.length) {
                console.log(individual)
                CatalogIndidual.deleteOne({ CatalogIndividualID: { $eq: individual.CatalogIndividualID } })
            }   
        })
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Could not delete individual with id " + req.params.SampleID_Catalog
        });
    });



};