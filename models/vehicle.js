// // import sequelize 
// var sequelize = require('sequelize')
// // import connection 
// var con = require('../config/database.js')

// const { DataTypes } = sequelize;

// // Define schema
// const Vehicle = con.db.define('vehicles', {
//     // Define attributes
//     vehicleid: {
//       type: DataTypes.STRING
//     },
//     vehicle_brand: {
//         type: DataTypes.STRING
//       },
//     vehicle_type: {
//       type: DataTypes.STRING
//     },
//     vehicle_condition: {
//         type: DataTypes.STRING
//     },
//     power_status: {
//         type: DataTypes.STRING
//     },
//     ign_status: {
//       type: DataTypes.STRING
//     },
//     speed: {
//       type: DataTypes.STRING
//     },
//     operating_time: {
//       type: DataTypes.DATE
//     }
//   },{
//     // Freeze Table Name
//     freezeTableName: true
//   });
   
//   // Export model Product
//   module.exports = { 
//     Vehicle
//   }


module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('vehicles', {
  // Define attributes
  vehicleid: {
    type: DataTypes.STRING
  },
  vehicle_brand: {
    type: DataTypes.STRING
  },
  vehicle_type: {
      type: DataTypes.STRING
  },
  name: {
      type: DataTypes.STRING
  },
  vin: {
    type: DataTypes.STRING
  },
  license_plate:{
    type: DataTypes.STRING
  },
  deviceId: {
    type: DataTypes.STRING
  },
  simId: {
    type: DataTypes.STRING
  },
  tagging:{
    type:DataTypes.STRING
  },
  assignment:{
    type: DataTypes.INTEGER
  },
  init_odometer:{
      type: DataTypes.INTEGER
  }
  ,vehicle_name:{
    type: DataTypes.STRING
  },
  createdBy:{
    type: DataTypes.INTEGER
  }
},{
  // Freeze Table Name
  freezeTableName: true
});
// Task.associate = function(models) {
//     Task.hasMany(models.User),{
//       foreignKey: 'id',
//       as: 'users',
//     }
// }
return Vehicle;
}