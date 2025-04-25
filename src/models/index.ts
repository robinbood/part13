const Blog = require("./blog");

const User = require("./user");

const Team = require("./teams");

const Membership = require("./membership");

const UserBlogs = require("./userBlogs");

User.hasMany(Blog);

Blog.belongsTo(User);

User.belongsToMany(Team,{through: Membership});

Team.belongsToMany(User,{through: Membership});

Blog.belongsToMany(User,{through: UserBlogs, as :"users_marked" });

User.belongsToMany(Blog,{through: UserBlogs, as :"blogs_marked" });

module.exports = {Blog,User,Team,Membership,UserBlogs};