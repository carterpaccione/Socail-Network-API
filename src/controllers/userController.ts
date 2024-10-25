import { Request, Response } from 'express';
import User from '../models/User.js';

// GET all users

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const userData = await User.find();
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
    console.log(req.body);
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
    const { newUserInfo } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            { _id: id },
            { $set: newUserInfo },
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

// DELETE to remove user by ID

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json({ message: 'User successfully deleted!' });

    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };