const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../app/models');

module.exports = {
  secret: '1FEED53F4DAF676302D813345BBDAAB8838BBF351A8E491EBE1CDF1C15927363',
  receive: false,
  saveUninitialized: false,
  resave: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
