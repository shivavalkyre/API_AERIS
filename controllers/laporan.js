require('dotenv').config();
var util = require('util');
var futil = require('../config/utility.js');
var axios = require('axios')

var result = {
    "code":"",
    "status":""
}

var result_vehicle_usage = []
// Latest Status get Sclid

var Daily = async function(req,res){
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

            
            futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE BODY] | INFO ' + util.inspect(response.data));
            var list_sclid = []
            
            for (i=0;i<= response.data.length-1;i++){
                var vehicleSclId = response.data[i].vehicleSclId;
                // var vehicleUid = response.data[i].vehicleUid
                // list_sclid.push({vehicleSclId:vehicleSclId,vehicleUid:vehicleUid})
            


            // vehicle usage
            // current_date
            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            var today = year+'-'+month+'-'+day;

            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            let dd = currentDate.getDate();
            let mm = currentDate.getMonth() + 1;
            let yyyy = currentDate.getFullYear();
            let yesterday = yyyy+'-'+mm+'-'+dd;
            
                
            const config = {
              headers:{
                  token : access_token
              }
            }
            var url_vehicle_usage = process.env.URL_VEHICLE_USAGE+ yesterday+'&endDate='+today+'&limit=10&vehiclesclid='+vehicleSclId;

            let res2 = await axios.get(url_vehicle_usage,config)
            .then( function (response) {

            //   var result = {
            //     "status":true,
            //     "message":"success",
            //     "data": list_sclid
            // }

            // res.setHeader("Content-Type", "application/json");
            // res.writeHead(200);
            // res.end(JSON.stringify(result));
              futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA LENGTH ] '  + util.inspect(response.data.length));
              futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA ] - ' + i + ' - '+ vehicleSclId +' ' + util.inspect(response.data));
              var  result_vehicle_usage = []
              for (j=0;j<=response.data.length-1;j++){
                  futil.logger.debug('\n' + futil.shtm() + '- [ DATANYA ] '  + util.inspect(response.data[j]));
                  
                   
                      var total_waktu_bergerak = response.data[j].totalTimeVehicleMovingSec;
                      futil.logger.debug('\n' + futil.shtm() + '- [ TOTAL WAKTU BERGERAK ] '  + util.inspect(total_waktu_bergerak));
                      var persen_waktu_bergerak =  response.data[j].vehicleMovingPercentage;
                      futil.logger.debug('\n' + futil.shtm() + '- [ PERSEN WAKTU BERGERAK ] '  + util.inspect(persen_waktu_bergerak));
                      var total_waktu =  response.data[j].totalTimeVehicleUsedSec;
                       futil.logger.debug('\n' + futil.shtm() + '- [ TOTAL WAKTU ] '  + util.inspect(total_waktu ));
                      var total_diam =  response.data[j].totalTimeVehicleIdleSec;
                      var persen_diam =  response.data[j].vehicleIdlePersentage;
                      var persen_penggunaan_unit =  response.data[j].vehicleUtilizationPercentage;
                      var persen_unit_tidak_digunakan =  response.data[j].vehicleRemainingUtilizationPercentage;
                      var total_KM =  response.data[j].totalKm;
                      var total_kritis =  response.data[j].criticalCount;
                      var total_peringatan =  response.data[j].warningCount;
                      var total_info =  response.data[j].infoCount;
                      var total_segment =  response.data[j].countSegments;

                      result_vehicle_usage.push[{"total_waktu_bergerak":total_waktu_bergerak,"persen_waktu_bergerak":persen_waktu_bergerak,"total_waktu":total_waktu,"total_diam":total_diam,"persen_diam":persen_diam,"persen_penggunaan_unit":persen_penggunaan_unit,"persen_unit_tidak_digunakan":persen_unit_tidak_digunakan,"total_KM":total_KM,"total_kritis":total_kritis,"total_peringatan":total_peringatan,"total_info":total_info,"total_segment":total_segment}]
                      futil.logger.debug('\n' + futil.shtm() + '- [ RESULT DATA ] '  + util.inspect(result_vehicle_usage));
                    
                if( j= response.data.length-1){
                    result =  result_vehicle_usage;
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(200);
                    res.end(JSON.stringify(result,null,3));
                 }
              }

  
             

              // futil.logger.debug('\n' + futil.shtm() + '- [ RESULT DATA ] '  + util.inspect(result));
              


            }).catch(function (error) {
              futil.logger.debug('\n' + futil.shtm() + '- [ ERROR RESPONSE DATA ]  ' + util.inspect(error.response));
            })
           
          }
            

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


var DailySummary = async function(req,res){
   
    var access_token = process.env.TOKEN_AERTRAK
    var startDate = req.params.startDate
    var endDate = req.params.endDate

    futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAM ] '  + util.inspect(req.params));

    var url_daily_summary = process.env.URL_DAILY_SUMMARY + startDate +"&endDate="+endDate;

    futil.logger.debug('\n' + futil.shtm() + '- [ URL SUMMARY ] '  + util.inspect(url_daily_summary));


    const config = {
      headers:{
          token : access_token
      }
    }

    let res2 = await axios.get(url_daily_summary,config)
    .then( function (response) {

      
      futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA ] '  + util.inspect(response.data));
      futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA LENGTH ] '  + util.inspect(response.data.length));


      result.data = response.data
      result.code = "200"
      result.status = true


      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(result,null,3));
    
    
    }).catch(function (error){
        
      futil.logger.debug('\n' + futil.shtm() + '- [ RESPONSE DATA ERROR ] '  + util.inspect(error));
    })
    





}

module.exports = {
Daily,
DailySummary,
}