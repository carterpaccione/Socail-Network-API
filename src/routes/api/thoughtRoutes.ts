import { Router } from 'express';
const router = Router();

import {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThought
} from '../../controllers/thoughtController.js';

// /api/thoughts

router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id

router.route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThought);

export { router as thoughtRouter };