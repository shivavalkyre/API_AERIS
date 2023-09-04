var axios = require('axios')
const db = require("../models");
const Device = db.device

var util = require('util');
var futil = require('../config/utility.js');

var result = {
    "code":"",
    "status":""
}

require('dotenv').config();

var Create = async function (req,res){
    try{
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.headers));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));

        const task = await Device.create(req.body);
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT DEVICE CREATE] | QUERING ' + util.inspect(task));
        result.code = 200
        result.status ="success"
        result.data = "New data inserted"
        res.send(result);
    }catch (err){
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

        const count = await Device.count({
            where: {
                createdBy: createdby
            }
        });
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));

        var resp = await Device.findAll({ offset: offset, limit: limit,raw:true,
            where: {
                createdBy: createdby
            },
            order: [
                ['id', 'ASC'],
                ]
            });

            futil.logger.debug('\n' + futil.shtm() + '- [ RESULT DEVICE] | QUERING ' + util.inspect(resp));
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

    } catch (err){

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
        
        const count = await Device.count({
            where: {
                createdBy: createdby
            }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));
        
        // var limit = parseInt(req.headers.rows)
        // var offset = parseInt(req.headers.offset)
        // var page = parseInt(req.headers.page)

        var resp = await Device.findAll({ raw:true,
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

var Update = async function (req,res){
    try {

        futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
        
        const task = await Device.update(req.body, {
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
        futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PARAM ] | INFO ' + util.inspect(req.params));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));

        await Device.destroy({
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


var AllDevices = async function(req,res){
    try {
       var url = process.env.URL_ALL_DEVICE
       const config = {
        headers:{
            Authorization : process.env.FLESPI_TOKEN
        }
      }
      
       axios.get(url,config)
       .then(function (response) {
        var result = {
            "status":true,
            "message":"success",
            "data": response.data.result
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

    } catch (err) {
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err));
    }
}

var SelectedDevice = async function(req,res){
    try {

        var device = req.body.device
        var url = process.env.URL_SELECT_DEVICE +  device
       

        const config = {
         headers:{
             Authorization : process.env.FLESPI_TOKEN
         }
       }
       
        axios.get(url,config)
        .then(function (response) {
         var result = {
             "status":true,
             "message":"success",
             "data": response.data.result
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
 
     } catch (err) {
         futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err));
     }
}
var DeviceInformation = async function(req,res){
    try {
        var device = req.body.device
        var params = req.body.params
        var url = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params

       

        const config = {
            headers:{
                Authorization : process.env.FLESPI_TOKEN
            }
          }

        axios.get(url,config)
        .then(function (response) {
         var result = {
             "status":true,
             "message":"success",
             "data": response.data.result
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
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err)); 
    }
}

var LogDevices = async function (req,res){
    try{
        // get All devices

        var url = process.env.URL_ALL_DEVICE
        const config = {
         headers:{
             Authorization : process.env.FLESPI_TOKEN
         }
       }
       
        axios.get(url,config)
        .then(function (response) {
            var result = response.data.result
            var device = ""
            for (i=0;i<=result.length-1;i++){

                var id = result[i].id
                // console.log('id: ' + id)
                device += id + ","
            }
           device = device.substring(0,device.length-1)
            //console.log(device)
           var params = "position,timestamp,battery.voltage,battery.current,absolute.acceleration,engine.ignition.status,external.powersource.voltage,gnss.status,gsm.signal.level,vehicle.mileage"
           var url_detail = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params
           
           axios.get (url_detail,config)
           .then (function (response){
                var result = response.data.result
                // console.log(result)
           }).catch(function (err){
                console.log(err)
           })
       })
       .catch(function (err) {
        //  var result = {  
 
        //      "status":false,
        //      "message": err
        //  }
        //  res.setHeader("Content-Type", "application/json");
        //  res.writeHead(400);
        //  res.end(JSON.stringify(result,null,3));
        console.log(err)
       })
       
       
        


    }catch (err){
        console.log(err)
    }
}

function GetDetailLog(id,reply){
    try {
        var device = id
        var params = "position,timestamp,battery.voltage,battery.current,absolute.acceleration,engine.ignition.status,external.powersource.voltage,gnss.status,gsm.signal.level,vehicle.mileage"
        var url = process.env.URL_SELECT_DEVICE +  device +'/telemetry/' + params

       

        const config = {
            headers:{
                Authorization : process.env.FLESPI_TOKEN
            }
          }

        axios.get(url,config)
        .then(function (response) {
        //  var result = {
        //      "status":true,
        //      "message":"success",
        //      "data": response.data.result
        //    }
        //    res.setHeader("Content-Type", "application/json");
        //    res.writeHead(200);
        //    res.end(JSON.stringify(result));

        reply ()
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
        futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | RETREIVING ' + util.inspect(err)); 
    }
}

module.exports = {
   Create,
   Read,
   ReadAll,
   Update,
   Delete,
   AllDevices,
   SelectedDevice,
   DeviceInformation,
   LogDevices
}