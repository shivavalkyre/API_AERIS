const db = require("../models");
const { Op } = require("sequelize");
const User = db.user;
var util = require('util');
var futil = require('../config/utility.js');

var result = {
    "code":"",
    "status":""
}

var Create = async function(req,res){
    try {
        const user = await User.create(req.body);
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
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
    // try {
    //     const user = await User.findAll();
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST USER ] | INFO');

    // try {
        
    //     const user = await User.findAll({
    //         raw:true
    //     });
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT USER ] | QUERING ' + util.inspect(user));
    //     result.code = 200
    //     result.status ="success"
    //     result.data = user
    //     res.send(result);
    //     // res.status(200).send(task);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    //     result.code = 400
    //     result.status ="failed"
    //     result.data = "Read data failed"
    //     res.send(result);
    // }
    try {
        
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS ] | INFO ' + util.inspect(req.headers));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  page] | INFO ' + util.inspect(req.headers.page));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  rows] | INFO ' + util.inspect(req.headers.rows));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  offset] | INFO ' + util.inspect(req.headers.offset));
        futil.logger.debug('\n' + futil.shtm() + '- [ REQ PARAMS  createdby] | INFO ' + util.inspect(req.headers.createdby));

        var createdby = parseInt(req.headers.createdby)
        
        const count = await User.count({
            where: {
                level : {[Op.notLike]: '%administrator%'},
                createdBy : createdby
              }
        });

        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT COUNT ] | QUERING ' + util.inspect(count));
        
        var limit = parseInt(req.headers.rows)
        var offset = parseInt(req.headers.offset)
        var page = parseInt(req.headers.page)

        var resp = await User.findAll({ offset: offset, limit: limit,raw:true,
            where: {
                level : {[Op.notLike]: '%administrator%'},
                createdBy : createdby
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

var ReadAll  = async function (req,res){
    try {
        
        var createdby = parseInt(req.headers.createdby)

        const user = await User.findAll({
            raw:true,
            where: {
                level : {[Op.notLike]: '%administrator%'},
                createdBy : createdby
              },
            order: [
                ['id', 'ASC'],
                ]
        });
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT USER ] | QUERING ' + util.inspect(user));
        result.code = 200
        result.status ="success"
        result.data = user
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

var ReadPetugas = async function(req,res){
    //  try {
    //     const user = await User.findAll();
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST USER ] | INFO');

    try {
        
        const user = await User.findAll({
            raw:true,
            where: {
                level : {[Op.notLike]: '%administrator%'}
              },
            order: [
                ['id', 'ASC'],
                ]
        });
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT USER ] | QUERING ' + util.inspect(user));
        result.code = 200
        result.status ="success"
        result.data = user
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

var ReadAdmin = async function(req,res){
    //  try {
    //     const user = await User.findAll();
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST USER ] | INFO');

    try {
        
        const user = await User.findAll({
            raw:true,
            where: {
                level : {[Op.like]: '%administrator%'}
              },
            order: [
                ['id', 'ASC'],
                ]
        });
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT USER ] | QUERING ' + util.inspect(user));
        result.code = 200
        result.status ="success"
        result.data = user
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

var ReadAdminSelected = async function(req,res){
    //  try {
    //     const user = await User.findAll();
    //     futil.logger.debug('\n' + futil.shtm() + '- [ RESULT ] | QUERING ' + util.inspect(user));
    //     res.send(user);
    // } catch (err) {
    //     futil.logger.debug('\n' + futil.shtm() + '- [ ERROR ] | QUERING ' + util.inspect(err));
    // }
    // futil.logger.debug('\n' + futil.shtm() + '- [ REQUEST USER ] | INFO');

    try {
        var createdby = parseInt(req.headers.createdby)

        const user = await User.findAll({
            raw:true,
            where: {
                level : {[Op.like]: '%administrator%'},
                createdBy : createdby
              },
            order: [
                ['id', 'ASC'],
                ]
        });
        futil.logger.debug('\n' + futil.shtm() + '- [ RESULT USER ] | QUERING ' + util.inspect(user));
        result.code = 200
        result.status ="success"
        result.data = user
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

var Update = async function (req,res){
    try {
        const user = await User.update(req.body, {
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
        await User.destroy({
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

module.exports = {
    Create,
    Read,
    ReadAll,
    ReadPetugas,
    ReadAdmin,
    ReadAdminSelected,
    Update,
    Delete
}