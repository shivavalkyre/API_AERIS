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

var ReadCategory = async function (req,res){

    var access_token = process.env.TOKEN_AERTRAK
    var accountId = process.env.ACCOUNTID
    var url_latest_status = process.env.URL_LATEST_STATUS_AERTRACK +'accountId='+ accountId +'&includeHierarchy =false'

    futil.logger.debug('\n' + futil.shtm() + '- [ ASSETS LATEST STATUS ] | INFO ');  
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ASSETS LATEST STATUS ] | INFO ' + util.inspect(url_latest_status)); 

    const config = {
        headers:{
            token : access_token
        }
      }

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    let res1 = await axios.get(url_latest_status,config)
        .then(async function (response) {

            
            // futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY] | INFO ' + util.inspect(response.data)); 
            // var result = {
            //     "status":true,
            //     "message":"success",
            //     "data": response.data
            // }

            // res.setHeader("Content-Type", "application/json");
            // res.writeHead(200);
            // res.end(JSON.stringify(result));

            var all_ctr=0
            var sedan_ctr=0
            var wagon_ctr=0 
            var dmax_ctr=0
            var dmux_ctr=0

            var data_length = response.data.length
            var data =  response.data

            const count = await Vehicle.count();
            var resp = await Vehicle.findAll({ raw:true});

            // futil.logger.debug('\n' + futil.shtm() + '- [ DATA ] | INFO ' + util.inspect(data)); 
            futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 

            loop1: for (i=0;i<=data_length-1;i++){
                futil.logger.debug('\n' + futil.shtm() + '- [ DATA '+ i +'] | INFO ' + util.inspect(data[i].vehicleUid)); 
                loop2: for (j=0;j<=resp.length-1;j++){
                    futil.logger.debug('\n' + futil.shtm() + '- [ RESP '+ j +'] | INFO ' + util.inspect(resp[j].vehicleid)); 
                    
                    if (data[i].vehicleUid == resp[j].vehicleid){
                        var vehicle_type = resp[j].vehicle_type

                        futil.logger.debug('\n' + futil.shtm() + '- [ VEHICLE TYPE ' + j + '] | INFO ' + util.inspect(vehicle_type)); 
                       
                        if (vehicle_type.indexOf('Sedan')>0){
                            sedan_ctr++
                            
                        }else if(vehicle_type.indexOf('Wagon')>0){
                            wagon_ctr++
                            
                        }else if(vehicle_type.indexOf('Max')>0){
                            dmax_ctr++
                            
                        }else {
                            dmux_ctr++
                           
                        }
                        break loop2;
                    }
                }
            }

            all_ctr = sedan_ctr + wagon_ctr + dmax_ctr + dmux_ctr
          
            var result = {
                status:true,
                message :"success",
                data: {
                    all: all_ctr,
                    sedan:sedan_ctr,
                    wagon:wagon_ctr,
                    dmax:dmax_ctr,
                    dmux:dmux_ctr
                }
            }

           
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(result));

            

            // return response.data

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE DATA ]  ' + util.inspect(error.response.data));
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE STATUS ]  ' + util.inspect(error.response.status));
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE HEADER ]  ' + util.inspect(error.response.headers));
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR REQUEST ]  ' + util.inspect(error.request));
                // console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ]  ' + util.inspect(error.message));
              }
              futil.logger.debug('\n' + futil.shtm() + '- [ ERROR CONFIG]  ' + util.inspect(error.config));

              var result = {  

                "status":false,
                "message": 'ERROR CONNECTION'
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify(result,null,3));
         })
}

var ReadSelectedCategory = async function (req,res){
    var access_token = process.env.TOKEN_AERTRAK
    var accountId = process.env.ACCOUNTID
    var url_latest_status = process.env.URL_LATEST_STATUS_AERTRACK +'accountId='+ accountId +'&includeHierarchy =false'
    var vehicle_category = req.params.category

    futil.logger.debug('\n' + futil.shtm() + '- [ ASSETS LATEST STATUS ] | INFO ');  
    futil.logger.debug('\n' + futil.shtm() + '- [ URL ASSETS LATEST STATUS ] | INFO ' + util.inspect(url_latest_status)); 

    
    const config = {
        headers:{
            token : access_token
        }
      }

    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADER] | INFO ' + util.inspect(config)); 
    let res1 = await axios.get(url_latest_status,config)
        .then(async function (response) {

            

            // var all_ctr=0
            // var sedan_ctr=0
            // var wagon_ctr=0 
            // var dmax_ctr=0
            // var dmux_ctr=0

            var data_length = response.data.length
            var data =  response.data

            data.forEach(object => {
                object.vehicleType = '';
              })

            const count = await Vehicle.count();
            var resp = await Vehicle.findAll({ raw:true});

            // futil.logger.debug('\n' + futil.shtm() + '- [ DATA ] | INFO ' + util.inspect(data)); 
            futil.logger.debug('\n' + futil.shtm() + '- [ RESP] | INFO ' + util.inspect(resp)); 

            loop1: for (i=0;i<=data_length-1;i++){
                futil.logger.debug('\n' + futil.shtm() + '- [ DATA '+ i +'] | INFO ' + util.inspect(data[i].vehicleUid)); 
                loop2: for (j=0;j<=resp.length-1;j++){
                    futil.logger.debug('\n' + futil.shtm() + '- [ RESP '+ j +'] | INFO ' + util.inspect(resp[j].vehicleid)); 
                    
                    if (data[i].vehicleUid == resp[j].vehicleid){
                        var vehicle_type = resp[j].vehicle_type

                        futil.logger.debug('\n' + futil.shtm() + '- [ VEHICLE TYPE ' + j + '] | INFO ' + util.inspect(vehicle_type)); 
                       
                        if (vehicle_type.indexOf(vehicle_category)>0){
                            data[i].vehicleType = vehicle_type
                            futil.logger.debug('\n' + futil.shtm() + '- [ DATA '+ i +'] | INFO ' + util.inspect(data[i]))
                        }

                        break loop2;
                    }
                }
            }

      
          
            var result = {
                status:true,
                message :"success",
                data: data
            }

           
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(result));

            

            // return response.data

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE DATA ]  ' + util.inspect(error.response.data));
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE STATUS ]  ' + util.inspect(error.response.status));
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE HEADER ]  ' + util.inspect(error.response.headers));
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR REQUEST ]  ' + util.inspect(error.request));
                // console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                // console.log('Error', error.message);
                futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ]  ' + util.inspect(error.message));
              }
              futil.logger.debug('\n' + futil.shtm() + '- [ ERROR CONFIG]  ' + util.inspect(error.config));

              var result = {  

                "status":false,
                "message": 'ERROR CONNECTION'
            }
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify(result,null,3));
         })
}

var ReadSelected = async function (req,res){
    try{
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS] | INFO ' + util.inspect(req.headers));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMSS] | INFO ' + util.inspect(req.params));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY] | INFO ' + util.inspect(req.body));

        var vehicleid = req.params.id

        const count = await Vehicle.count({
            where: {
                vehicleid: vehicleid
            }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT VEHICLE ] | QUERING ' + util.inspect(count));

        var resp = await Vehicle.findAll({ raw:true,
            where: {
                vehicleid: vehicleid
            },
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT VEHICLE SELECTED] | QUERING ' + util.inspect(resp));

            var j=1
           
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
            var url = process.env.URL_KM_DRIVEN+ 'startDate=' + startDate + '&endDate='+ endDate +'&assetUid=' + assetUid ;
        }else{
            var url = process.env.URL_KM_DRIVEN+ 'startDate=' + startDate + '&endDate='+ endDate ;
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

var Segment = async function (req,res){
    try {
        
        var startDate = req.body.startDate
        var endDate = req.body.endDate
        var sclId = req.body.sclId
        // var assetUid = req.body.assetUid
        // var accountId = req.body.accountId
        var token = process.env.TOKEN_AERTRAK

        if (sclId){
            var url = process.env.URL_VEHICLE_SEGMENT+ 'startDate=' + startDate + '&endDate='+ endDate +'&sclId=' +  sclId ;
        }else{
            var url = process.env.URL_VEHICLE_SEGMENT+ 'startDate=' + startDate + '&endDate='+ endDate ;
        }
        
        futil.logger.debug('\n' + futil.shtm() + '- [ URL SEGMENTS] | INFO ' + util.inspect(url));
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
    ReadSelected,
    ReadSelectedCategory,
    ReadAll,
    ReadAllData,
    ReadKMDriven,
    ReadCategory,
    ReadUsage,
    ReadOdometer,
    TripReport,
    Segment,
    Update,
    Delete,
    DeleteAll
}