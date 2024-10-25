import { Router } from 'express';
const router = Router();

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';

// /api/thoughts

router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id

router.route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export { router as thoughtRouter };