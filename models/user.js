// // import sequelize 
// var sequelize = require('sequelize')
// // import connection 
// var con = require('../config/database.js')

// const { DataTypes } = sequelize;

// // Define schema
// const User = con.db.define('users', {
//     // Define attributes
//     username: {
//       type: DataTypes.STRING
//     },
//     password: {
//         type: DataTypes.STRING
//       },
//     level: {
//       type: DataTypes.STRING
//     }
//   },{
//     // Freeze Table Name
//     freezeTableName: true
//   });

//   User.associate = function(models) {

//   }
   
//   // Export model Product
//   module.exports = { 
//     User
//   }

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
    // Define attributes
    username: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
      },
    level: {
      type: DataTypes.STRING
    },
    ph_number:{
      type: DataTypes.STRING
    },
    area:{
      type:DataTypes.STRING
    },
    createdBy:{
      type:DataTypes.INTEGER
    }
  },{
    // Freeze Table Name
    freezeTableName: true
  });

  // User.associate = function(models) {
  //   User.belongsTo(models.Task,{
  //       foreignKey: 'userid',
  //       as:'users'
  //   })
  // }
  return User;
}