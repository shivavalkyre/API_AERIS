require('dotenv').config();
var util = require('util');
var futil = require('../config/utility.js');
var axios = require('axios')

var result = {
    "code":"",
    "status":""
}



var Read = async function(req,res){
    try {
        

        var token = process.env.TOKEN_AERTRAK

        // current date
        var today = new Date();
        var yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        var formattedToday = yyyy + '-' + mm + '-' + dd;

        var url = process.env.URL_ALERTS +'startDate=' + formattedToday + '&endDate=' + formattedToday;

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

var Agregat =  async function(req,res){
    try {
        

        var token = process.env.TOKEN_AERTRAK

        // current date
        var today = new Date();
        var yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        var formattedToday = yyyy + '-' + mm + '-' + dd;

        var url = process.env.URL_ALERT_AGREGAT +'startDate=' + formattedToday + '&endDate=' + formattedToday;

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
    Read,
    Agregat
}