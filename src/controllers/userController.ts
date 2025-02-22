import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// GET all users
// Messing around with poopulate() method to include thoughts and friends data with specific fields.

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const userData = await User.find().populate('thoughts').populate ({ path: 'friends', select: '_id username' });
        // .select('-__v')
        // .populate({
        //     path: 'thoughts',
        //     select: '_id thoughtText reactionCount'
        // })
        // .populate({
        //     path: 'friends',
        //     select: '_id username'
        // }); wasnt showing the reaction count for some reason
        res.json(userData);
    } catch (err: any) {
        res.status(400).json({message: err.message });
    }
};

// GET a single user by ID (populate thought and friend data)

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userData = await User.findById(id).populate('thoughts friends');
        res.json(userData);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// POST a new user

const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
        const newUser = await User.create({ username, email });
        res.json(newUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// PUT to update a user by ID

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            { _id: id },
            { $set: { username: username } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE to remove user by ID and all associated thoughts

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userInfo = await User.findById(id);
        if (!userInfo) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        const username = userInfo.username;
        await User.findByIdAndDelete(id);
        await Thought.deleteMany({ username: username });
        res.json({ message: `User: ${username} and thoughts successfully deleted!` });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// POST to add a new friend to a user's friend list

const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { runValidators: true, new: true }
        )
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        } else if (!friendId) {
            res.status(404).json({ message: 'No available friend found with this ID!' });
            return;
        }
        res.json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE to remove a friend from a user's friend list

const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { runValidators: true, new: true }
        )
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        } else if (!friendId) {
            res.status(404).json({ message: 'No available friend found with this ID!' });
            return;
        }
        res.json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
};