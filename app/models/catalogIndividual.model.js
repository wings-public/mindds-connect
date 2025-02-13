const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../controllers/db.js');

const CatalogIndividualSchema = new Schema({
    CatalogIndividualID: {type: Number, trim: true, required: true, unique: true, },
    PIID: {type: Number, trim: true, required: true},
    LocalIndividualID: {type: String, trim: true, required: true},
    Sex: {type: Number, trim: true, required: true},
    DateOfBirth: {type: Date, trim: true, required: false},
    CenterID: {type: Number, trim: true, required: true},
    UserAdd: {type: Number, trim: true, required: true},
    AddDate: {type: Date, default: Date.now},
    UpdateDate: {type: Date},

})
module.exports = db.model('CatalogIndividual',CatalogIndividualSchema);