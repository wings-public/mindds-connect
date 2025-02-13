module.exports = (app) => {
    const samplecatalog = require('../controllers/samplecatalog.controller.js');
    const loginRequired = require('../controllers/userControllers.js').loginRequired;
    const CatalogIndidual = require('../models/catalogIndividual.model.js');
    const SampleIndividualHPO = require('../models/sampleCatalogSampleIndividualHPOs.model.js');
    // Create a new samplecatalog
    app.post('/samplecatalog', loginRequired, samplecatalog.create);

    // Retrieve all samplecatalog
    app.get('/samplecatalog', loginRequired, samplecatalog.findAll);
   
   
    // Retrieve a single samplecatalog with samplecatalogId
    app.get('/samplecatalog/:SampleID_Catalog', loginRequired, samplecatalog.findOne);

    // Update a samplecatalog with samplecatalogId
    app.post('/samplecatalog/:SampleID_Catalog/:CatalogIndividualID', loginRequired, samplecatalog.update);

    // Delete a samplecatalog with samplecatalogId
    app.post('/samplecatalog/:SampleID_Catalog', loginRequired, samplecatalog.delete);

    app.route('/samplecatalog/:type/:ID').get(loginRequired,async (req,res,next) => {
        try {
            if ( req.params.type ) {
                var type = req.params.type;
                if ( type == "PIID" ) {
                    if ( req.params.ID ) {

                        var piid = req.params.ID;
                        var data = await samplecatalog.fullSample(piid);
                        res.status(200).json({'message':data});
                    } 
                } 
            }
        } catch(err) {
            //res.status(400).json({'message':`failure:${err}`});
            next(`${err}`);
        }
    });



}