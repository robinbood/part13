require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.DaTABASE_URI,
    SECRET : process.env.SECRET
}; 