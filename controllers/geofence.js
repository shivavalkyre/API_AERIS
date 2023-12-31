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

        futil.logger.debug('\n' + futil.shtm() + '- [ MODE ] | INFO ' + util.inspect(mode));
        futil.logger.debug('\n' + futil.shtm() + '- [ COORDINATES ] | INFO ' + util.inspect(coordinates));

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

        if (mode == 'circle'){
            var url = process.env.URL_GEOFENCE;
            var formatted_coordinate = [[coordinates[1],coordinates[0]]]

            futil.logger.debug('\n' + futil.shtm() + '- [ FORMATTED COORDINATE ] | INFO ' + util.inspect(formatted_coordinate));
            var param_coordinate = JSON.stringify(formatted_coordinate)

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
                      formatted_coordinate
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
            var formatted_coordinate = []
            var temp_coordinate 
            futil.logger.debug('\n' + futil.shtm() + '- [ COORDINATE LENGTH ] | INFO ' + util.inspect( coordinates.length));

            for (i=0;i<= coordinates.length-1;i++){
              temp_coordinate = [coordinates[i].lng,coordinates[i].lat]
              futil.logger.debug('\n' + futil.shtm() + '- [ TEMP COORDINATE ] | INFO ' + util.inspect(temp_coordinate));
              formatted_coordinate.push(temp_coordinate)
            }

            futil.logger.debug('\n' + futil.shtm() + '- [ FORMATTED COORDINATE ] | INFO ' + util.inspect(formatted_coordinate));
            var param_coordinate = JSON.stringify({"type": coordinate_type,"geometry":{"type":"Polygon","coordinates": [formatted_coordinate]}})

            var postData= {
              "id": placeId,
              "name": placeId,
              "address": address,
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
        result.data = err
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
        var mode = req.body.mode
        var placeId = req.body.placeId
        var address = req.body.address
        var type = "PLACE"
        var coordinate_type = req.body.coordinate_type
        var geomerty_type = req.body.geomerty_type
        var radius = req.body.radius
        var customerId = String(req.body.customerId)
        var coordinates = req.body.coordinates

        const config = {
            headers:{
                token : process.env.TOKEN_AERTRAK
            }
          }

        futil.logger.debug('\n' + futil.shtm() + '- [ MODE REQUEST UPDATE ] | INFO ' + util.inspect(mode));

        if (mode == 'circle'){

          var url = process.env.URL_GEOFENCE + '/' + placeUid ;
          futil.logger.debug('\n' + futil.shtm() + '- [ URL UPDATE GEOFENCE CIRCLE ] | INFO ' + util.inspect(url));
          
          var formatted_coordinate = [[coordinates[1],coordinates[0]]]
          futil.logger.debug('\n' + futil.shtm() + '- [ FORMATTED COORDINATE ] | INFO ' + util.inspect(formatted_coordinate));
          var param_coordinate = JSON.stringify(formatted_coordinate)

            var postData =   {
                "placeId": placeId,
                "name":placeId,
                "type": "PLACE",
                "address": address,
                "coordinates": {
                  "type": coordinate_type,
                  "geometry": {
                    "type": "Point",
                    "coordinates": 
                      formatted_coordinate
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
        }else if (mode == 'polygon'){

          futil.logger.debug('\n' + futil.shtm() + '- [ ORI COORDINATE LENGTH  POLYGON] | INFO ' + util.inspect(coordinates.length));
          futil.logger.debug('\n' + futil.shtm() + '- [ ORI COORDINATE POLYGON] | INFO ' + util.inspect(coordinates));
          
          var url = process.env.URL_GEOFENCE_POLYGON + '/' + placeUid;
          futil.logger.debug('\n' + futil.shtm() + '- [ URL UPDATE GEOFENCE POLYGON ] | INFO ' + util.inspect(url));
          var formatted_coordinate = []
          var temp_coordinate 

          for (i=0;i<= coordinates.length-1;i++){
            temp_coordinate = [coordinates[i].lng,coordinates[i].lat]
            futil.logger.debug('\n' + futil.shtm() + '- [ TEMP COORDINATE POLYGON] | INFO ' + util.inspect(temp_coordinate));
            formatted_coordinate.push(temp_coordinate)
          }

          futil.logger.debug('\n' + futil.shtm() + '- [ FORMATTED COORDINATE ] | INFO ' + util.inspect(formatted_coordinate));
          var param_coordinate = JSON.stringify({"type": coordinate_type,"geometry":{"type":"Polygon","coordinates": [formatted_coordinate]}})

          var postData= {
            "id": placeId,
            "name": placeId,
            "address": address,
            "type": "PLACE",
            "coordinates": param_coordinate
            }   
        }
       

        futil.logger.debug('\n' + futil.shtm() + '- [ URL UPDATE GEOFENCE ] | INFO ' + util.inspect(url));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY SENT ] | INFO ' + util.inspect(postData));
      

 

            axios.put(url,postData,config) .then(function (response) {

            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY UPDATE ] | INFO ' + util.inspect(response.data));

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

            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY ERROR ] | INFO ' + util.inspect(err));

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



var History = async function(req,res){
  try {
      
      var startDate = req.body.startDate
      var endDate = req.body.endDate
      var sclId = req.body.sclId
      var token = process.env.TOKEN_AERTRAK

      var url = process.env.URL_GEOFENCE_HISTORY + 'startDate=' + startDate + '&endDate=' + endDate;
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

var HistoryDetail = async function(req,res){
  try {
      
      var startDate = req.body.startDate
      var endDate = req.body.endDate
      var sclId = req.body.sclId
      var token = process.env.TOKEN_AERTRAK

      var url = process.env.URL_GEOFENCE_HISTORY_DETAILS + 'startDate=' + startDate + '&endDate=' + endDate + '&sclId='+ sclId;
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
    Update,
    Delete,
    History,
    HistoryDetail,
}