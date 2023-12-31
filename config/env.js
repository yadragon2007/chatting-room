require('dotenv').config()

module.exports = {
  database:{
    userName:process.env.DATABASEUSERNAME,
    password: process.env.DATABASEPASSWORD,
    port: process.env.PORT
  },
  google:{
    clientID: process.env.GoogleClintId,
    clientSecret: process.env.GoogleClientSecret,
    callBack: process.env.GoogleCallBack,
  },
  github:{
    clientID: process.env.GitHubClintId,
    clientSecret: process.env.GitHubClintSecret,
    callBack: process.env.GitHubCallBack,
  }
}