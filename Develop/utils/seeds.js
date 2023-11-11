//imports
const mongoose = require("mongoose");
const db = require("../models");
const {User, Thought, Reation} = require("../models");

const connection = require("../config/connection");

//seeds
const users = [
    {
        username: "BobS",
        email: "Bob@gmail.com",
        thoughts: [],
    },
];

console.log(connection);

//connect to server
connection.once("open", async () => {
    console.log("connected to database");

    //drop existing users
    await User.deleteMany({});

    //add seed data to database
    await User.insertMany(users);

    console.log("seed all done!");
    process.exit(0);
});