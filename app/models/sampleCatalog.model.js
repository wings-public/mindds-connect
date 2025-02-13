const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../controllers/db.js');

const SampleCatalogSchema = new Schema({
    CatalogIndividualID: {type: Number, trim: true, required: true},
    SampleID_Catalog: {type: Number, trim: true, required: true},
    LocalSampleID: {type: String, trim: true, required: true},
    MaterialTypeID: {type: Number, trim: true, required: true},
    AnatomicalSiteID: {type: Number, trim: true, required: true},
    CenterID: {type: Number, trim: true, required: true},
    AgeOfSampling: {type: Number, trim: true},
    AgeAtDiagnosis: {type: Number, trim: true},
    PIID: {type: Number, trim: true, required: true},
    DiagnosisTypeID: {type: Number, trim: true, required: true},
    AgeAtRemission: {type: Number, trim: true},
    AgeOfDeath: {type: Number, trim: true},
    FamilyMembersAvailable: {type: Boolean},
    GenotypeDataAvailable: {type: Number, trim: true, required: true},
    UserAdd: {type: Number, trim: true, required: true},
    AddDate: {type: Date, default: Date.now},
    UpdateDate: {type: Date},
    Visibility: {type: Number, required: true},

})
module.exports = db.model('SampleCatalog',SampleCatalogSchema);