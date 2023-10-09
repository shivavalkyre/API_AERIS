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
        
        var mode = req.body.mode
        var placeId = req.body.placeId
        var address = req.body.address
        var type = "PLACE"
        var coordinate_type = req.body.coordinate_type
       
        var geomerty_type = req.body.geomerty_type
        var customerId = req.body.customerId
        var coordinates = req.body.coordinates

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

        if (mode == 'circle'){
            var url = process.env.URL_GEOFENCE;
            var radius = req.body.radius

            var postData =   {
                "placeId": placeId,
                "type": "PLACE",
                "address": address,
                "coordinates": {
                  "type": coordinate_type,
                  "geometry": {
                    "type": "Point",
                    "coordinates": 
                      coordinates
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
        }else{
            // var postData =  {
            //     "placeId": placeId,
            //     "type": "PLACE",
            //     "address": address,
            //     "coordinates": {
            //         "type": coordinate_type,
            //       "geometry": {
            //         "type": "Polygon",
            //         "coordinates": coordinates
            //       }
            //     },
            //     "customerId": customerId
            //   }

            var url = process.env.URL_GEOFENCE_POLYGON;

            var param_coordinate = JSON.stringify({"type": coordinate_type,"geometry":{"type":"Polygon","coordinates": JSON.stringify(coordinates)}})

            var postData= {
              "id": "Test2",
              "name": "TestPolygonPlace",
              "address":"Taman Udayana V No.26",
              "type": "PLACE",
              "coordinates": param_coordinate,
              "customerId": customerId
              }   
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


var Update = async function(req,res){
    try {

        var token = process.env.TOKEN_AERTRAK
        var placeUid = req.body.placeUid
        var url = process.env.URL_GEOFENCE + '/' + placeUid ;
        var mode = req.body.mode
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

        if (mode == 'circle'){
            var postData =   {
                "placeId": placeId,
                "type": "PLACE",
                "address": address,
                "coordinates": {
                  "type": coordinate_type,
                  "geometry": {
                    "type": "Point",
                    "coordinates": 
                      coordinates
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
        }else{
            var postData =  {
                "placeId": placeId,
                "type": "PLACE",
                "address": address,
                "coordinates": {
                    "type": coordinate_type,
                  "geometry": {
                    "type": "Polygon",
                    "coordinates": coordinates
                  }
                },
                "properties": {
                    "radius": {
                      "unit": "meter",
                      "value": radius
                    }
                  },
                "customerId": customerId
              }
        }
       

        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY SENT ] | INFO ' + util.inspect(postData));
      

 

          axios.put(url,postData,config) .then(function (response) {

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

var Delete = async function(req,res){
    try {

        var token = process.env.TOKEN_AERTRAK
        var placeUid = req.body.placeUid
        var url = process.env.URL_GEOFENCE + '/' + placeUid ;

        futil.logger.debug('\n' + futil.shtm() + '- [ URL ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        // futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY SENT ] | INFO ' + util.inspect(postData));

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

        axios.delete(url,config) .then(function (response) {
            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ] | INFO ' + util.inspect(response.data));

            var result = {
                "status":true,
                "message":"success",
                "data": response.data
              }
              res.setHeader("Content-Type", "application/json");
              res.writeHead(200);
              res.end(JSON.stringify(result));

        }).catch(function (err) {
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


module.exports = {
    Create,
    Read,
    Update,
    Delete

}