module.exports = (app) => {
   const samplecataloghpos = require('../controllers/samplecataloghpos.controller.js');
    //const samplecataloghpos = require('c:/Users/Benja/samplecatalog-app/app/controllers/samplecataloghpos.controller.js');
    
    const loginRequired = require('../controllers/userControllers.js').loginRequired;
   
   
    // Retrieve a single samplecataloghpos with samplecatalogId
    app.get('/samplecataloghpos/:CatalogIndividualID', loginRequired, samplecataloghpos.findAllIndividual);


    // Delete a samplecataloghpos with samplecatalogId
    app.post('/samplecataloghpos/:CatalogIndividualID/:HPOID', loginRequired, samplecataloghpos.delete);
}