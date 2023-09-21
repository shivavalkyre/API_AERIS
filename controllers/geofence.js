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

        var token = process.env.TOKEN_AERTRAK
        var url = process.env.URL_GEOFENCE;

        var placeId = req.body.placeId
        var address = req.body.address
        var type = "PLACE"
        var coordinate_type = req.body.coordinate_type
        var geomerty_type = req.body.geomerty_type
        var radius = req.body.radius
        var customerId = req.body.customerId
        var coordinates = req.body.coordinates

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }


        var postData =   {
          "placeId": placeId,
          "type": "PLACE",
          "address": address,
          "coordinates": {
            "type": coordinate_type,
            "geometry": {
              "type": geomerty_type,
              "coordinates": [
                coordinates
              ]
            },
            "properties": {
              "radius": {
                "unit": "meter",
                "value": radius
              }
            }
          },
          "customerId": customerId
        }

        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY SENT ] | INFO ' + util.inspect(postData));
      

 

          axios.post(url,postData,config) .then(function (response) {

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


    }catch(err){
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
        result.code = 400
        result.status ="failed"
        result.data = "Read data failed"
        res.send(result);
    }
}

var Read = async function(req,res){
    try {
        

        var token = process.env.TOKEN_AERTRAK

        var url = process.env.URL_GEOFENCE;
        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        const config = {
            headers:{
                token : token
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

module.exports = {
    Create,
    Read,
}