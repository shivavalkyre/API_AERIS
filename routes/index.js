// Import express
var express = require ('express');
 // Init express router
var router = express.Router();
var User = require('../controllers/user.js')
var Task = require('../controllers/task.js')
var Vehicle = require('../controllers/vehicle.js')
var Vehicle_User = require('../controllers/vehicle_user.js')
var Geofence = require('../controllers/geofence.js')
var Notif = require('../controllers/notifikasi.js')
var Assets = require('../controllers/assets.js')
var Devices = require('../controllers/device.js')
var Auth = require('../controllers/auth.js')
var util = require('util');
var futil = require('../config/utility.js');
let multer = require('multer');
let upload = multer();


router.get('/api/patern',function (req, res, next) {
    res.send({message:'Welcome Patern'})
    res.end()
})


router.get('/api/patern/users',Auth.authAccessToken,function (req, res){

    User.Read(req,res)
})

// Asset ================================================================

router.post('/api/patern/assets',Auth.authAccessToken,function (req, res){
    Assets.AllAssets1(req,res)
})

router.get('/api/patern/assets/:sclId',Auth.authAccessToken,function (req, res){
    Assets.AssetByID(req,res)
})

// router.post('/api/patern/latest_status/:accountId/:sclId',Auth.authAccessToken,function (req, res){
//     Assets.LatestStatus1(req,res)
// })

router.post('/api/patern/latest_status',Auth.authAccessToken,function (req, res){
    Assets.LatestStatus1(req,res)
})

router.get('/api/patern/latest_status/:sclId',Auth.authAccessToken,function (req, res){
    Assets.LatestStatus(req,res)
})

router.get('/api/patern/asset_address/:lat/:lng',Auth.authAccessToken,function (req, res){
    Assets.AssetAddress(req,res)
})


router.post('/api/patern/status_count',Auth.authAccessToken,function (req, res){
    Assets.StatusCount(req,res)
})

router.post('/api/patern/history',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS HISTORY ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY HISTORY] | INFO ' + util.inspect(req.body));
    Assets.History(req,res)
})

// Vehicle ===============================================================
router.post('/api/patern/vehicles',Auth.authAccessToken,function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.Create(req,res)
})

router.post('/api/patern/vehicles/generate',Auth.authAccessToken,function(req,res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.Create(req,res)
})

router.get('/api/patern/vehicles',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.Read(req,res)
})

router.get('/api/patern/vehicles/all/data',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.ReadAllData(req,res)
})

router.get('/api/patern/vehicles/all',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS VEHICLE ALL ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY VEHICLE ALL ] | INFO ' + util.inspect(req.body));
    Vehicle.ReadAll(req,res)
})


router.post('/api/patern/vehicle/usage',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS VEHICLE USAGE ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY VEHICLE USAGE ] | INFO ' + util.inspect(req.body));
    Vehicle.ReadUsage(req,res)
})

router.get('/api/patern/vehicle/trip',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS VEHICLE TRIP ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY VEHICLE TRIP ] | INFO ' + util.inspect(req.body));
    Vehicle.TripReport(req,res)
})


router.post('/api/patern/vehicle/odometer',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS VEHICLE ALL ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY VEHICLE ALL ] | INFO ' + util.inspect(req.body));
    Vehicle.ReadOdometer(req,res)
})

router.post('/api/patern/vehicle/kmdriven',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.ReadKMDriven(req,res)
})



router.put('/api/patern/vehicles/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Vehicle.Update(req,res)
})

router.delete('/api/patern/vehicles/:id',Auth.authAccessToken,function (req, res){
    Vehicle.Delete(req,res)
})

router.delete('/api/patern/vehicles',Auth.authAccessToken,function (req, res){
    Vehicle.DeleteAll(req,res)
})


// Vehicle User ===============================================================
// router.post('/api/patern/vehicle_user',Auth.authAccessToken,function(req,res){
//     Vehicle_User.Create(req,res)
// })

// router.get('/api/patern/vehicle_user',Auth.authAccessToken,function (req, res){
//     Vehicle_User.Read(req,res)
// })

// router.get('/api/patern/vehicle_user/all/:vehicleid',Auth.authAccessToken,function (req, res){
//     Vehicle_User.ReadVehicleUsed(req,res)
// })

// router.get('/api/patern/vehicle_user/used/:vehicleid',Auth.authAccessToken,function (req, res){
//     Vehicle_User.ReadUserVehicle(req,res)
// })

// router.put('/api/patern/vehicle_user/:id',Auth.authAccessToken,function (req, res){
//     Vehicle_User.Update(req,res)
// })

// router.delete('/api/patern/vehicle_user/:id',Auth.authAccessToken,function (req, res){
//     Vehicle_User.Delete(req,res)
// })

// Geofence ===========================================================

router.post('/api/patern/geofence',Auth.authAccessToken,function(req,res){
    Geofence.Create(req,res)
})

router.get('/api/patern/geofence',Auth.authAccessToken,function(req,res){
    Geofence.Read(req,res)
})

router.put('/api/patern/geofence',Auth.authAccessToken,function(req,res){
    Geofence.Update(req,res)
})

router.delete('/api/patern/geofence',Auth.authAccessToken,function(req,res){
    Geofence.Delete(req,res)
})


//  notifikasi ========================================================

router.get('/api/patern/alerts',Auth.authAccessToken,function(req,res){
    Notif.Read(req,res)
})

// User ===============================================================

router.post('/api/patern/users',Auth.authAccessToken,function(req,res){
    User.Create(req,res)
})

router.get('/api/patern/users',Auth.authAccessToken,function (req, res){
    User.Read(req,res)
})

router.get('/api/patern/users/all',Auth.authAccessToken,function (req, res){
    User.ReadAll(req,res)
})

router.get('/api/patern/users/chat',Auth.authAccessToken,function (req, res){
    User.ReadPetugas(req,res)
})

router.get('/api/patern/users/admin',Auth.authAccessToken,function (req, res){
    User.ReadAdmin(req,res)
})

router.get('/api/patern/users/admin/selected',Auth.authAccessToken,function (req, res){
    User.ReadAdminSelected(req,res)
})

router.put('/api/patern/users/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Update(req,res)
})

router.delete('/api/patern/users/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    User.Delete(req,res)
})

// Device =============================================================
router.post('/api/patern/devices',Auth.authAccessToken,function(req,res){
    Devices.Create(req,res)
})

router.get('/api/patern/devices',Auth.authAccessToken,function (req, res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Devices.Read(req,res)
    
})

router.get('/api/patern/devices/all',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    Devices.ReadAll(req,res)
})

router.get('/api/patern/devices/all/data',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    Devices.ReadAllData(req,res)
})

router.put('/api/patern/devices/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Devices.Update(req,res)
})

router.delete('/api/patern/devices/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Devices.Delete(req,res)
})
// Task ===============================================================
router.post('/api/patern/tasks',Auth.authAccessToken,function(req,res){

    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQ FILE ] | INFO ' + util.inspect(req.file));
    Task.Create(req,res)
})

router.get('/api/patern/tasks',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ BODY ] | INFO ' + util.inspect(req.body));
    Task.Read(req,res)
})

router.get('/api/patern/tasks/:status',Auth.authAccessToken,function (req, res){
    Task.ReadTaskByStatus(req,res)
})

// router.get('/api/patern/tasks/:id',Auth.authAccessToken,function (req, res){
//     Task.ReadTaskUser(req,res)
// })

router.put('/api/patern/tasks/:id',Auth.authAccessToken,function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQ FILE ] | INFO ' + util.inspect(req.file));
    Task.Update(req,res)
})

router.delete('/api/patern/tasks/:id',function (req, res){
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST HEADERS ] | INFO ' + util.inspect(req.headers));
    futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST PARAMS ] | INFO ' + util.inspect(req.params));
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST BODY ] | INFO ' + util.inspect(req.body));
    Task.Delete(req,res)
})

// router.post('/api/patern/devices',Auth.authAccessToken,function(req,res){
//     Devices.AllDevices(req,res)
// })

// router.post('/api/patern/device',Auth.authAccessToken,function(req,res){
//     Devices.SelectedDevice(req,res)
// })

// router.post('/api/patern/device/details',Auth.authAccessToken,function(req,res){
//     Devices.DeviceInformation(req,res)
// })

router.post('/api/patern/auth',function (req, res, next) {
    Auth.Login(req,res)
})



// router.post('/api/patern/users',User.Create)
// router.get('/api/patern/users',User.Read)
// router.put('/api/patern/users/:id',User.Update)
// router.delete('/api/patern/users/:id',User.Delete)

module.exports.router = router

