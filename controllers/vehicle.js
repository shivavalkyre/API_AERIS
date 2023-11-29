const db = require("../models");
const Vehicle = db.vehicle
require('dotenv').config();
var util = require('util');
var futil = require('../config/utility.js');
var axios = require('axios')

var result = {
    "code":"",
    "status":""
}

var Create = async function(req,res){
    try {
        const vehicle = await Vehicle.create(req.body);
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(vehicle));
        result.code = 200
        result.status ="success"
        result.data = "New data inserted"
        res.send(result);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Insert data failed"
        res.send(result);
    }
}



var Read = async function(req,res){
    try {
        
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.headers));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  page] | INFO ' + util.inspect(req.headers.page));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  rows] | INFO ' + util.inspect(req.headers.rows));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  offset] | INFO ' + util.inspect(req.headers.offset));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  createdby] | INFO ' + util.inspect(req.headers.createdby));

  

        
        
        var limit = parseInt(req.headers.rows)
        var offset = parseInt(req.headers.offset)
        var page = parseInt(req.headers.page)
        var createdby = parseInt(req.headers.createdby)

        const count = await Vehicle.count({
            where: {
                createdBy: createdby
            }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));

        var resp = await Vehicle.findAll({ offset: offset, limit: limit,raw:true,
            where: {
                createdBy: createdby
            },
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT TASK] | QUERING ' + util.inspect(resp));
            // var rows_data = []
            // rows_data.push(result)
            var j
            if (offset == 0 ){
                j=1
            }else{
                j= (offset * (page-1))+1
            }

            for (i=0;i<=resp.length-1;i++){
                resp[i].no = j
                j++
            }

            var response = {"total":count,"rows":resp}   
            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT RESPONSE] | QUERING ' + util.inspect(response));  
            result.code = 200
            result.status ="success"
            result.data = response
            res.send(result);
        // res.status(200).send(task);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var ReadAllData = async function(req,res){
    try {
        
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.headers));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  page] | INFO ' + util.inspect(req.headers.page));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  rows] | INFO ' + util.inspect(req.headers.rows));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  offset] | INFO ' + util.inspect(req.headers.offset));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  createdby] | INFO ' + util.inspect(req.headers.createdby));

  

        
        
        var limit = parseInt(req.headers.rows)
        var offset = parseInt(req.headers.offset)
        var page = parseInt(req.headers.page)
        

        const count = await Vehicle.count();

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));

        var resp = await Vehicle.findAll({ offset: offset, limit: limit,raw:true,
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT TASK] | QUERING ' + util.inspect(resp));
            // var rows_data = []
            // rows_data.push(result)
            var j
            if (offset == 0 ){
                j=1
            }else{
                j= (offset * (page-1))+1
            }

            for (i=0;i<=resp.length-1;i++){
                resp[i].no = j
                j++
            }

            var response = {"total":count,"rows":resp}   
            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT RESPONSE] | QUERING ' + util.inspect(response));  
            result.code = 200
            result.status ="success"
            result.data = response
            res.send(result);
        // res.status(200).send(task);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var ReadAll = async function(req,res){
    try {    

        var createdby = parseInt(req.headers.createdby)
        
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.headers));
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  page] | INFO ' + util.inspect(req.headers.page));
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  rows] | INFO ' + util.inspect(req.headers.rows));
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  offset] | INFO ' + util.inspect(req.headers.offset));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  createdby] | INFO ' + util.inspect(req.headers.createdby));

        const count = await Vehicle.count({
            where: {
                createdBy: createdby
            }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));
        
        // var limit = parseInt(req.headers.rows)
        // var offset = parseInt(req.headers.offset)
        // var page = parseInt(req.headers.page)

        var resp = await Vehicle.findAll({ raw:true,
            where: {
                createdBy: createdby
            },
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT VEHICLE ALL] | QUERING ' + util.inspect(resp));
            // var rows_data = []
            // rows_data.push(result)
            var j=1
            // if (offset == 0 ){
            //     j=1
            // }else{
            //     j= (offset * (page-1))+1
            // }

            for (i=0;i<=resp.length-1;i++){
                resp[i].no = j
                j++
            }

            var response = {"total":count,"rows":resp}   
            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT RESPONSE] | QUERING ' + util.inspect(response));  
            result.code = 200
            result.status ="success"
            result.data = response
            res.send(result);

    } catch (err){

        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }

}

var ReadOdometer = async function(req,res){
    try {    

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS] | INFO ' + util.inspect(req.headers));
        var vehicleid = req.headers.vehicleid
        
        
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  page] | INFO ' + util.inspect(req.headers.page));
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  rows] | INFO ' + util.inspect(req.headers.rows));
        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  offset] | INFO ' + util.inspect(req.headers.offset));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS vehicleid] | INFO ' + util.inspect(req.headers.vehicleid));

        const count = await Vehicle.count({
            where: {
                vehicleid: vehicleid
            }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT VEHICLE ] | QUERING ' + util.inspect(count));
        
        // var limit = parseInt(req.headers.rows)
        // var offset = parseInt(req.headers.offset)
        // var page = parseInt(req.headers.page)

        var resp = await Vehicle.findAll({ raw:true,
            where: {
                vehicleid: vehicleid
            },
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT VEHICLE ALL] | QUERING ' + util.inspect(resp));
            // var rows_data = []
            // rows_data.push(result)
            var j=1
            // if (offset == 0 ){
            //     j=1
            // }else{
            //     j= (offset * (page-1))+1
            // }

            for (i=0;i<=resp.length-1;i++){
                resp[i].no = j
                j++
            }

            var response = {"total":count,"rows":resp}   
            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT RESPONSE] | QUERING ' + util.inspect(response));  
            result.code = 200
            result.status ="success"
            result.data = response
            res.send(result);

    } catch (err){

        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var ReadKMDriven = async function(req,res){
    try {
        
        var startDate = req.body.startDate
        var endDate = req.body.endDate
        var assetUid = req.body.assetUid
        var accountId = req.body.accountId
        var token = process.env.TOKEN_AERTRAK

        var url = process.env.URL_KM_DRIVEN + 'startDate=' + startDate + '&endDate='+ endDate + '&assetUid=' + assetUid + '&accountId=' +accountId;
        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

          axios.get(url,config) .then(function (response) {

            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.data));

            var result = {
                "status":true,
                "message":"success",
                "data": response.data
              }
              res.setHeader("Content-Type", "application/json");
              res.writeHead(200);
              res.end(JSON.stringify(result));
          })
          .catch(function (err) {
            var result = {  
    
                "status":false,
                "message": err
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify(result,null,3));
          })


    }catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var ReadUsage = async function(req,res){
    try {
        
        var startDate = req.body.startDate
        var endDate = req.body.endDate
        // var assetUid = req.body.assetUid
        // var accountId = req.body.accountId
        var token = process.env.TOKEN_AERTRAK

        var url = process.env.URL_VEHICLE_USAGE+ 'startDate=' + startDate + '&endDate='+ endDate + '&limit=7';
        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

          axios.get(url,config) .then(function (response) {

            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.data));

            var result = {
                "status":true,
                "message":"success",
                "data": response.data
              }
              res.setHeader("Content-Type", "application/json");
              res.writeHead(200);
              res.end(JSON.stringify(result));
          })
          .catch(function (err) {
            var result = {  
    
                "status":false,
                "message": err
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify(result,null,3));
          })


    }catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var TripReport = async function(req,res){
    try {
        
        var startDate = req.body.startDate
        var endDate = req.body.endDate
        var assetUid = req.body.assetUid
        // var assetUid = req.body.assetUid
        // var accountId = req.body.accountId
        var token = process.env.TOKEN_AERTRAK
        if (assetUid){
            var url = process.env.URL_VEHICLE_TRIP+ 'startDate=' + startDate + '&endDate='+ endDate +'&assetUid=' + assetUid ;
        }else{
            var url = process.env.URL_VEHICLE_TRIP+ 'startDate=' + startDate + '&endDate='+ endDate ;
        }
        
        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

          axios.get(url,config) .then(function (response) {

            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.data));

            var result = {
                "status":true,
                "message":"success",
                "data": response.data
              }
              res.setHeader("Content-Type", "application/json");
              res.writeHead(200);
              res.end(JSON.stringify(result));
          })
          .catch(function (err) {
            var result = {  
    
                "status":false,
                "message": err
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify(result,null,3));
          })


    }catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var Update = async function (req,res){
    try {
        const vehicle = await Vehicle.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        result.code = 200
        result.status ="success"
        result.data = "Update data success"
        res.send(result);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Update data failed"
        res.send(result);
    }
}

var Delete = async function (req,res){
    try {
        await Vehicle.destroy({
            where: {
                id: req.params.id
            }
        });
        result.code = 200
        result.status ="success"
        result.data = "Delete data success"
        res.send(result);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Delete data failed"
        res.send(result);
    }
}

var DeleteAll = async function (req,res){
    try {
        await Vehicle.destroy({
            where: {},
            truncate: true
        });
        result.code = 200
        result.status ="success"
        result.data = "Delete data success"
        res.send(result);
    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Delete data failed"
        res.send(result);
    }
}

module.exports = {
    Create,
    Read,
    ReadAll,
    ReadAllData,
    ReadKMDriven,
    ReadUsage,
    ReadOdometer,
    TripReport,
    Update,
    Delete,
    DeleteAll
}