import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET all thoughts

const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughtData = await Thought.find();
        res.json(thoughtData);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// GET a single thought by ID

const getThoughtById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thoughtData = await Thought.findById(id);
        res.json(thoughtData);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// POST a new thought

const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username, userID } = req.body;
    try {
        const thoughtData = await Thought.create({ thoughtText, username });
        await User.findByIdAndUpdate(userID, { $push: { thoughts: thoughtData._id } });
        res.json(thoughtData);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// PUT update a thought by ID

const updateThoughtById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { thoughtText } = req.body;
    
    try {
        const thoughtData = await Thought.findByIdAndUpdate(
            { _id: id },
            { $set: thoughtText },
            { runValidators: true, new: true },
        )
        res.json(thoughtData);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a thought by ID

const deleteThought = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete({ _id: id });

        if (!thought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export { getAllThoughts, getThoughtById, createThought, updateThoughtById, deleteThought };