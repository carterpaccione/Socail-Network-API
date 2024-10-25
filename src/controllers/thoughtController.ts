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
    const { thoughtText, username, userId } = req.body;
    try {
        const thoughtData = await Thought.create({ thoughtText, username });
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { $push: { thoughts: thoughtData._id } },
            { runValidators: true, new: true }
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json({ message: `${thoughtData._id} has been created by user ${updatedUser?.username}` });
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
            { $set: { thoughtText: thoughtText }},
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

        await User.updateOne(
            { thoughts: thought._id },
            { $pull: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );

        res.json(`Thought, ${thought._id}, has been deleted!`);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// POST reaction to a thought

const createReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $push: {reactions: { reactionBody, username }}
            },
            { runValidators: true, new: true }
        )

        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this ID!' });
            return;
        }
        res.json(updatedThought);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE reaction from a thought

const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { reactionId } = req.body;

    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
            { runValidators: true, new: true }
        )
        res.json(updatedThought);
    } catch (err: any) {
        res.status(400).json({ message: err.message});
    }
};

export {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
};