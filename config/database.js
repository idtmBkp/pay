require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};
/*
module.exports = {
  username: process.env.DB_USERNAME,
  host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  password: 'dajkwwhetlpov1th',
  database: 'nzgzpbkqgj5cpld0',
  dialect: 'mysql',
}; */
