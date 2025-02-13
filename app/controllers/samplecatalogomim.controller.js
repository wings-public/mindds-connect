const SampleCatalog = require('../models/sampleCatalog.model.js');
const CatalogIndidual = require('../models/catalogIndividual.model.js');
const SampleIndividualOMIM = require('../models/sampleCatalogSampleIndividualOMIMs.model.js');

const getConnection = require('../controllers/dbConn.js').getConnection;


exports.findAllIndividual = (req, res) => {
    SampleIndividualOMIM.find( { "CatalogIndividualID": { $eq: req.params.CatalogIndividualID }} ).then(individualhpos => {
        if(!individualhpos) {
            return res.status(404).send({
                message: "Individual not found with id " + req.params.CatalogIndividualID
            });            
        }
        res.send(individualhpos);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Individual not found with id " + req.params.CatalogIndividualID
            });                
        }
        return res.status(500).send({
            message: "Error retrieving individualhpos with id " + req.params.CatalogIndividualID
        });
    });
};


exports.delete = async(req, res) => {
    
    const result = await SampleIndividualOMIM.deleteMany({ CatalogIndividualID: { $eq: req.params.CatalogIndividualID } ,  OMIMID : { $eq: req.params.OMIMID}} );
    if (result.n >0) {
        res.send({message: result.n +  " elements deleted successfully!"});
    }
    else {
        return res.status(500).send({
            message: "No elements to delete or an error occured " 

        });
    }

};