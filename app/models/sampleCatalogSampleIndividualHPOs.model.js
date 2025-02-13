const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../controllers/db.js');

const sampleCatalogSampleIndividualHPOsSchema = new Schema({
    CatalogIndividualID: {type: Number, trim: true, required: true},
    SampleID_Catalog: {type: Number, trim: true, required: true},
    HPOID: {type: String, trim: true, required: true},
    HPO_Status: {type: Number, trim: true},
    Onset_Year: {type: Number, trim: true},
    Onset_Month: {type: Number, trim: true},
    HPO_Severity: {type: Number, trim: true},
    CenterID: {type: Number, trim: true, required: true},
    UserAdd: {type: Number, trim: true, required: true},
    AddDate: {type: Date, default: Date.now},
    UpdateDate: {type: Date},

})
module.exports = db.model('SampleCatalogSampleIndividualHPOs',sampleCatalogSampleIndividualHPOsSchema);