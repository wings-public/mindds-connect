module.exports = (app) => {
    const samplecatalogomim = require('../controllers/samplecatalogomim.controller.js');
    
    const loginRequired = require('../controllers/userControllers.js').loginRequired;
   
   
   
    // Retrieve a single samplecatalogomim with samplecatalogId
    app.get('/samplecatalogomim/:CatalogIndividualID', loginRequired, samplecatalogomim.findAllIndividual);



    // Delete a samplecatalogomim with samplecatalogId
    app.delete('/samplecatalogomim/:CatalogIndividualID/:OMIMID', loginRequired, samplecatalogomim.delete);
}