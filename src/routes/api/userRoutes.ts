import { Router } from 'express';
const router = Router();

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

// /api/users

router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// /api/users/:userId/:friendId

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export { router as userRouter };