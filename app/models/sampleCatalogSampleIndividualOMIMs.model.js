const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../controllers/db.js');

const SampleCatalogSampleIndividualOMIMsSchema = new Schema({
    CatalogIndividualID: {type: Number, trim: true, required: true},
    SampleID_Catalog: {type: Number, trim: true, required: true},
    OMIMID: {type: String, trim: true, required: true},
    CenterID: {type: Number, trim: true, required: true},
    UserAdd: {type: Number, trim: true, required: true},
    AddDate: {type: Date, default: Date.now},

})
module.exports = db.model('SampleCatalogSampleIndividualOMIMs',SampleCatalogSampleIndividualOMIMsSchema);