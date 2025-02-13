module.exports = (app) => {
    const samplecatalogindividual = require('../controllers/samplecatalogindividual.controller.js');
    const loginRequired = require('../controllers/userControllers.js').loginRequired;
    const path = require('path');


    // Retrieve all samplecatalog
    app.get('/samplecatalogindividual', loginRequired, samplecatalogindividual.findAll);
   
    // Retrieve a single samplecatalog with samplecatalogId
    app.get('/samplecatalogindividual/:CatalogIndividualID', loginRequired, samplecatalogindividual.findOne);


    // Delete a samplecatalog with samplecatalogId
    app.delete('/samplecatalogindividual/:CatalogIndividualID', loginRequired, samplecatalogindividual.delete);

    app.route('/samplecatalogindividual/:type/:ID').get(loginRequired,async (req,res,next) => {
        try {
            if ( req.params.type ) {
                var type = req.params.type;
                if ( type == "PIID" ) {
                    if ( req.params.ID ) {

                        var piid = req.params.ID;
                        var data = await samplecatalogindividual.getPIData(piid);
                        res.status(200).json({'message':data});
                    } 
                } else if ( type == "CatalogIndividualID" ) {
                    //console.log("TYPE is "+type);
                    if ( req.params.ID ) {
                        var indId = parseInt(req.params.ID);
                        var data = await readData(indId);
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