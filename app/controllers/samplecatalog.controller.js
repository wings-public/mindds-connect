const SampleCatalog = require('../models/sampleCatalog.model.js');
const CatalogIndidual = require('../models/catalogIndividual.model.js');
const SampleIndividualHPO = require('../models/sampleCatalogSampleIndividualHPOs.model.js');
const SampleIndividualOMIM = require('../models/sampleCatalogSampleIndividualOMIMs.model.js')
const getConnection = require('../controllers/dbConn.js').getConnection;
// Create and Save a new samplecatalog

        var client = getConnection();
        // Validate request
        console.log(req.body)
        var test1 = req.body['Data']
        console.log(test1)
        console.log(test1[0]['SampleID_Catalog'])
        for (var tryjsondata in test1){
            var printDataTry = test1[tryjsondata];
            console.log(printDataTry['SampleID_Catalog'])
        }


        if(!req.body.SampleID_Catalog) { //ask content
            return res.status(400).send({
                message: "sample content can not be empty lalal " + req.body.SampleID_Catalog
                
            });
        }

        CatalogIndidual.find({ CatalogIndividualID: { $eq: req.body.CatalogIndividualID }}).count().then(restest =>{
            console.log(restest);
        })
        CatalogIndidual.find({ CatalogIndividualID: { $eq: req.body.CatalogIndividualID }}, function(err,result) {
            console.log(result.length);
            if(!result.length){
                const individ = new CatalogIndidual({
                    CatalogIndividualID: req.body.CatalogIndividualID,
                    PIID: req.body.PIID,
                    LocalIndividualID: req.body.LocalIndividualID,
                    Sex: req.body.Sex,
                    CenterID: req.body.CenterID,
                    UserAdd: req.body.UserAdd,
                    AddDate: req.body.AddDate,
                    UpdateDate: req.body.UpdateDate,
                })

                individ.save()
                .then(dataIndividual => {
                    res.send(dataIndividual);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the individual."
                    });
                });
            }

        })

        var temp = req.body.HPOID.split(",");
        temp.forEach(function(value){
            const HPOs = new SampleIndividualHPO({
                CatalogIndividualID: req.body.CatalogIndividualID,
                SampleID_Catalog:  req.body.SampleID_Catalog,
                HPOID: value,
                CenterID: req.body.CenterID,
                UserAdd: req.body.UserAdd,
                AddDate: req.body.AddDate,
                UpdateDate: req.body.UpdateDate,
            })
            HPOs.save()
            .then(dataHPO => {
                res.send(dataHPO);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the individual."
                });
            });
        })


        const Omim = new SampleIndividualOMIM({
            CatalogIndividualID: req.body.CatalogIndividualID,
            SampleID_Catalog:  req.body.SampleID_Catalog,
            OMIMID: req.body.OMIMID,
            CenterID: req.body.CenterID,
            UserAdd: req.body.UserAdd,
            AddDate: req.body.AddDate,
        })
        Omim.save()
        .then(dataOMIM => {
            res.send(dataOMIM);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the individual."
            });
        });


        const sample = new SampleCatalog({
            CatalogIndividualID: req.body.CatalogIndividualID,
            SampleID_Catalog:  req.body.SampleID_Catalog,
            LocalSampleID: req.body.LocalSampleID,
            MaterialTypeID: req.body.MaterialTypeID,
            AnatomicalSiteID: req.body.AnatomicalSiteID,
            CenterID: req.body.CenterID,
            PIID: req.body.PIID,
            AgeOfSampling: req.body.AgeOfSampling,
            DiagnosisTypeID: req.body.DiagnosisTypeID,
            GenotypeDataAvailable: req.body.GenotypeDataAvailable,
            UserAdd: req.body.UserAdd,
            AddDate: req.body.AddDate,
            UpdateDate: req.body.UpdateDate,
            Visibility: req.body.Visibility,

        })



        sample.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the sample."
            });
        });
}; */
exports.create = (req, res) => {
    var client = getConnection();

    var jsonData = req.body['Data']



    if(!jsonData[0]['SampleID_Catalog']) { //ask content
        return res.status(400).send({
            message: "sample content can not be empty lalal " + jsonData[0]['SampleID_Catalog']
            
        });
    }

    CatalogIndidual.find({ CatalogIndividualID: { $eq: jsonData[0]['CatalogIndividualID'] }}).count().then(restest =>{
        console.log(restest);
    })
    CatalogIndidual.find({ CatalogIndividualID: { $eq: jsonData[0]['CatalogIndividualID'] }}, function(err,result) {
        console.log(result.length);
        if(!result.length){
            const individ = new CatalogIndidual({
                CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
                PIID: jsonData[0]['PIID'],
                LocalIndividualID: jsonData[0]['LocalIndividualID'],
                Sex: jsonData[0]['Sex'],
                CenterID: jsonData[0]['CenterID'],
                UserAdd: jsonData[0]['UserAdd'],
                AddDate: jsonData[0]['AddDate'],
                UpdateDate: jsonData[0]['UpdateDate'],
            })

            individ.save()
        }

    })
    if (jsonData[0]['HPOID'].length > 9){
        var temp = jsonData[0]['HPOID'].split(",");
        temp.forEach(function(value){
            const HPOs = new SampleIndividualHPO({
                CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
                SampleID_Catalog:  jsonData[0]['SampleID_Catalog'],
                HPOID: value,
                CenterID: jsonData[0]['CenterID'],
                UserAdd: jsonData[0]['UserAdd'],
                AddDate: jsonData[0]['AddDate'],
                UpdateDate: jsonData[0]['UpdateDate'],
            })
            HPOs.save()

        })
    }


    const Omim = new SampleIndividualOMIM({
        CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
        SampleID_Catalog:  jsonData[0]['SampleID_Catalog'],
        OMIMID: jsonData[0]['OMIMID'],
        CenterID: jsonData[0]['CenterID'],
        UserAdd: jsonData[0]['UserAdd'],
        AddDate: jsonData[0]['AddDate'],
    })
    Omim.save()
  


    const sample = new SampleCatalog({
        CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
        SampleID_Catalog:  jsonData[0]['SampleID_Catalog'],
        LocalSampleID: jsonData[0]['LocalSampleID'],
        MaterialTypeID: jsonData[0]['MaterialTypeID'],
        AnatomicalSiteID: jsonData[0]['AnatomicalSiteID'],
        CenterID: jsonData[0]['CenterID'],
        PIID: jsonData[0]['PIID'],
        AgeOfSampling: jsonData[0]['AgeOfSampling'],
        DiagnosisTypeID: jsonData[0]['DiagnosisTypeID'],
        GenotypeDataAvailable: jsonData[0]['GenotypeDataAvailable'],
        UserAdd: jsonData[0]['UserAdd'],
        AddDate: jsonData[0]['AddDate'],
        UpdateDate: jsonData[0]['UpdateDate'],
        Visibility: jsonData[0]['Visibility'],

    })



    sample.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the sample."
        });
    });
};
// Retrieve and return all samplecatalogs from the database.
exports.findAll = (req, res) => {
    var client = getConnection();
    SampleCatalog.find()
    .then(samples => {
        res.send(samples);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.fullSample = async(piid) =>  {

    piid = parseInt(piid);
    const agg= [
        { 
            "$match" : { 
                "PIID" : piid
            }
        }, 
        { 
            "$lookup" : { 
                "from" : "catalogindividuals", 
                "localField" : "CatalogIndividualID", 
                "foreignField" : "CatalogIndividualID", 
                "as" : "individuo"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$individuo"
            }
        }, 
        { 
            "$lookup" : { 
                "from" : "samplecatalogsampleindividualhpos", 
                "localField" : "CatalogIndividualID", 
                "foreignField" : "CatalogIndividualID", 
                "as" : "hpos"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$hpos",
                "preserveNullAndEmptyArrays" : true
            }
        }, 
        { 
            "$lookup" : { 
                "from" : "samplecatalogsampleindividualomims", 
                "localField" : "CatalogIndividualID", 
                "foreignField" : "CatalogIndividualID", 
                "as" : "omim"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$omim",
                "preserveNullAndEmptyArrays" : true
            }
        }
    ]
    var obj = [];
    try {
        const test = await SampleCatalog.aggregate(agg)
 
        for await ( const doc of test  ) {


        obj.push(await doc);

        }
        return obj;
    }catch(err){
        throw err
    }
};

// Find a single samplecatalog with a samplecatalogId
exports.findOne = (req, res) => {
    
    SampleCatalog.find( { "SampleID_Catalog": { $eq: req.params.SampleID_Catalog }} ).then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "Sample not found with id " + req.params.SampleID_Catalog
            });            
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sample not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Error retrieving sample with id " + req.params.SampleID_Catalog
        });
    });
};

    // Validate Request
    var jsonData = req.body['Data']

    if(!jsonData[0]['SampleID_Catalog']) {
        return res.status(400).send({
            message: "Sample content can not be empty"
        });
    }

    var myquery1 = { CatalogIndividualID: { $eq: req.params.CatalogIndividualID } }
    var newvaluesIndivid = {$set: {
        LocalIndividualID: req.body.LocalIndividualID,
        Sex: req.body.Sex,
    }}
    CatalogIndidual.updateOne(myquery1, newvaluesIndivid, function(err, res) {
        //if (err) throw err;
        console.log("1 document updated");
    })
    var myquery2 = { CatalogIndividualID: { $eq: req.params.CatalogIndividualID } , SampleID_Catalog: { $eq: req.params.SampleID_Catalog }}
    var newvaluesOmim = {$set: {
        OMIMID: req.body.OMIMID,
    }}
    SampleIndividualOMIM.updateOne(myquery2, newvaluesOmim, function(err, res) {
        //if (err) throw err;
        console.log("1 document updated");
    })

    var temp = req.body.HPOID.split(",");
    temp.forEach(function(value){
        const HPOs = new SampleIndividualHPO({
            CatalogIndividualID: req.params.CatalogIndividualID,
            SampleID_Catalog:  req.params.SampleID_Catalog,
            HPOID: value,
            CenterID: req.body.CenterID,
            UserAdd: req.body.UserAdd,
            AddDate: req.body.AddDate,
            UpdateDate: req.body.UpdateDate,
        })
        HPOs.save()
    })

    // Find sample and update it with the request body

    var myquery = { SampleID_Catalog: { $eq: req.params.SampleID_Catalog } }
    var newvalues = {$set: {
        CatalogIndividualID: req.body.CatalogIndividualID,
        SampleID_Catalog:  req.body.SampleID_Catalog,
        LocalSampleID: req.body.LocalSampleID,
        MaterialTypeID: req.body.MaterialTypeID,
        AnatomicalSiteID: req.body.AnatomicalSiteID,
        CenterID: req.body.CenterID,
        AgeOfSampling: req.body.AgeOfSampling,
        DiagnosisTypeID: req.body.DiagnosisTypeID,
        GenotypeDataAvailable: req.body.GenotypeDataAvailable,
        UserAdd: req.body.UserAdd,
        AddDate: req.body.AddDate,
        UpdateDate: req.body.UpdateDate,
        Visibility: req.body.Visibility,
    }}
    
    SampleCatalog.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    }).then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "sample not found with id " + req.params.SampleID_Catalog
            });
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "sample not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Error updating sample with id " + req.params.SampleID_Catalog
        });
    });
    
}; */
exports.update = (req, res) => {
    // Validate Request
    var jsonData = req.body['Data']

    if(!jsonData[0]['SampleID_Catalog']) {
        return res.status(400).send({
            message: "Sample content can not be empty"
        });
    }

    var myquery1 = { CatalogIndividualID: { $eq: req.params.CatalogIndividualID } }
    var newvaluesIndivid = {$set: {
        LocalIndividualID: jsonData[0]['LocalIndividualID'],
        Sex: jsonData[0]['Sex'],
    }}
    CatalogIndidual.updateOne(myquery1, newvaluesIndivid, function(err, res) {
        //if (err) throw err;
        console.log("1 document updated");
    })
    var myquery2 = { CatalogIndividualID: { $eq: req.params.CatalogIndividualID } , SampleID_Catalog: { $eq: req.params.SampleID_Catalog }}
    var newvaluesOmim = {$set: {
        OMIMID: jsonData[0]['OMIMID'],
    }}
    SampleIndividualOMIM.updateOne(myquery2, newvaluesOmim, function(err, res) {
        //if (err) throw err;
        console.log("1 document updated");
    })

    if (jsonData[0]['HPOID'].length > 9){
        var temp = jsonData[0]['HPOID'].split(",");
        temp.forEach(function(value){
            const HPOs = new SampleIndividualHPO({
                CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
                SampleID_Catalog:  jsonData[0]['SampleID_Catalog'],
                HPOID: value,
                CenterID: jsonData[0]['CenterID'],
                UserAdd: jsonData[0]['UserAdd'],

                
            })
            HPOs.save()
        })
    }




    // Find sample and update it with the request body

    var myquery = { SampleID_Catalog: { $eq: req.params.SampleID_Catalog } }
    var newvalues = {$set: {
        CatalogIndividualID: jsonData[0]['CatalogIndividualID'],
        SampleID_Catalog:  jsonData[0]['SampleID_Catalog'],
        LocalSampleID: jsonData[0]['LocalSampleID'],
        MaterialTypeID: jsonData[0]['MaterialTypeID'],
        AnatomicalSiteID: jsonData[0]['AnatomicalSiteID'],
        AgeOfSampling: jsonData[0]['AgeOfSampling'],
        DiagnosisTypeID: jsonData[0]['DiagnosisTypeID'],
        GenotypeDataAvailable: jsonData[0]['GenotypeDataAvailable'],
        Visibility: jsonData[0]['Visibility'],
    }}
    
    SampleCatalog.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    }).then(sample => {
        if(!sample) {
            return res.status(404).send({
                message: "sample not found with id " + req.params.SampleID_Catalog
            });
        }
        res.send(sample);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "sample not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Error updating sample with id " + req.params.SampleID_Catalog
        });
    });
    
};
// Delete a samplecatalog with the specified samplecatalogId in the request
exports.delete = (req, res) => {


    SampleIndividualHPO.deleteMany({ SampleID_Catalog: { $eq: req.params.SampleID_Catalog }}).then(hpodel => {
        console.log("hpo deleted" )

    })

    SampleIndividualOMIM.deleteMany({ SampleID_Catalog: { $eq: req.params.SampleID_Catalog }}).then(omimodel => {
        console.log("omim deleted" )

    })

    SampleCatalog.deleteMany({ SampleID_Catalog: { $eq: req.params.SampleID_Catalog } })
    .then(sample => {
        
        if(!sample) {
            return res.status(404).send({
                message: "Sample not found with id " + req.params.SampleID_Catalog
            });
        }


        res.send({message: "Note deleted successfully!"});
        SampleCatalog.find({ CatalogIndividualID: { $eq: sample.CatalogIndividualID }}, function(err,result){
            if(!result.length) {
                console.log(sample)
                CatalogIndidual.deleteOne({ CatalogIndividualID: { $eq: sample.CatalogIndividualID } }).then(delindivid => {
                    console.log("individ deleted" )

                })
                SampleIndividualHPO.deleteMany({ CatalogIndividualID: { $eq: sample.CatalogIndividualID }})
                SampleIndividualOMIM.deleteMany({ CatalogIndividualID: { $eq: sample.CatalogIndividualID }})
            }   
        })



    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.SampleID_Catalog
            });                
        }
        return res.status(500).send({
            message: "Could not delete sample with id " + req.params.SampleID_Catalog
        });
    });

    

};