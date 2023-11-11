//Import
const User = require('../models/userModel');
const { connect, connection } = require('mongoose');
const { db } = require('../models/userModel');

const { User, Thought } = require('../models');

//Get all users
const userController = {
    async getUsers(req, res) {
        try {
            const users = await User.find({});

.populate({
                path: 'thoughts',
                select: '-__v'
            })
.populate({ path: 'friends', select: '-__v' })

            return res.status(200).json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Get one user
    async getUser({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id });

.populate({           path: 'thoughts', 
                select: '-__v' })

.populate({ path: 'friends', select: '-__v' })

if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            return res.status(200).json(user);
        }   catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    //Create a user
    async createUser({ body }, res) {
        try {   
            const user = await User.create(body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
    //Update a user by id
    async updateUserById({ params, body }, res) {
        try {
            const user= await User.findOneAndUpdate (
                { _id: params.id },
               {$set: req.body},
                { new: true, runValidators: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    //Delete a user by id
    async deleteUserById({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });

if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            await Thought.deleteMany({ username: user.username });
            return res.status(200).json(user);
            message: "User deleted successfully",
        });
        
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    //Add a friend
    async addFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.id },
                { $addToSet: { friends: params.friendId } },
                { new: true, runValidators: true }
            );

if (!friend) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    //Delete a friend
    async deleteFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.id },
                { $pull: { friends: params.friendId } },
                { new: true, runValidators: true }
            );

if (!friend) {
                return res.status(404).json({ message: 'Check user and friend ID!' });
            }
            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
};

module.exports = userController;













