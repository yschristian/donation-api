
const dotenv = require('dotenv');
dotenv.config();
export default {
  "port": process.env.dbport,
  "mongoUrl": process.env.dburl,
};
