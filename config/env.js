require('dotenv').config()

module.exports = {
  database:{
    userName:process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    port: process.env.PORT
  }
}