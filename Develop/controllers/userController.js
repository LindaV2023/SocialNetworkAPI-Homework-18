//Import
// const User = require('../models/userModel');
// const { connect, connection } = require('mongoose');
// // const { db } = require('../models/userModel');

//Get all users
const { User, Thought } = require('../models');

const userController = {
    async getUser({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate({ path: 'friends', select: '-__v' });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
// };

        async createUser({ body }, res) {
    try {
        const user = await User.create(body);
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},

        async updateUserById({ params, body }, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { $set: body },
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

        async deleteUserById({ params }, res) {
    try {
        const user = await User.findOneAndDelete({ _id: params.id });

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        await Thought.deleteMany({ username: user.username });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
},

        async addFriend({ params }, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
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

        async deleteFriend({ params }, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Check user and friend ID!' });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
    };


module.exports = userController;













