const {User, Thought} = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(Thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async getThought({params}, res) {
        try {
            const thought = await Thought.findOne({_id: params.id});
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // async createThought({body, params: {userId}}, res) {
    //     try {
    //         const thought = await Thought.create(body);
    //         const user = await User.findOneAndUpdate(
    //             {_id: userId},
    //             {$push: {thoughts: thought._id}},
    //             {runValidators: true, new: true}
    //         );

    //         if (!user) {
    //             return res.status(404).json({message: 'No user with this id!'});
    //         }

    //         return res.status(200).json({thought, user});
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).json(err);
    //     }
    // },
    //             {$push: {thoughts: thought._id}},
    //             {runValidators: true, new: true}
    //         );

    //         if (!user) {
    //             return res.status(404).json({message: 'No user with this id!'});
    //         }

    //         return res.status(200).json({thought, user});
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).json(err);
    //     }
    // },
    async createThought({body, params: {userId}}, res) {
        try {
            const thought = await Thought.create(body);
            const user = await User.findOneAndUpdate(
                {_id: userId},
                {$push: {thoughts: thought._id}},
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({message: 'No user with this id!'});
            }

            return res.status(200).json({thought, user});
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },



            // );

        //     return res.status(200).json({thought, user});
        // } catch (err) {
        //     console.log(err);
        //     return res.status(400).json(err);
        // }
    // },
    // async updateThought({params, body}, res) {
    //     try {
    //         const thought = await Thought.findOneAndUpdate(
    //             {_id: params.id},
    //             body,
    //             {new: true, runValidators: true}
    //         );
    //         if (!thought) {
    //             return res.status(404).json({message: 'No thought with this id!'});
    //         }
    //         return res.json(thought);
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(400).json(err);
    //     }
    // },

     async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if (!thought) {
                return res.status(404).json({message: 'No thought with this id!'});
            }
            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    async deleteThought({params}, res) {
        try {
            const thought = await Thought.findOneAndDelete({_id: params.id});
            if (!thought) {
                return res.status(404).json({message: 'No thought with this id!'});
            }
            return res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    async addReaction({params, body}, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$push: {reactions: body}},
                {new: true, runValidators: true}
            );
            if (!reaction) {
                return res.status(404).json({message: 'No thought with this id!'});
            }
            return res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

    async deleteReaction({params}, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                {_id: params.thoughtId},
                {$pull: {reactions: {reactionId: params.reactionId}}},
                {new: true}
            );
            if (!reaction) {
                return res.status(404).json({message: 'Check thought and reaction ID!'});
            }
            return res.status(200).json(reaction);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },

};


module.exports = thoughtController;



