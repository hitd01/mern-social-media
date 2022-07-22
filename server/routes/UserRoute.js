import express from 'express';
import {
    deleteUser,
    followUser,
    getAllUsers,
    getUser,
    unfollowUser,
    updateUser,
} from '../controllers/UserController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.put('/:id/follow', verifyToken, followUser);
router.put('/:id/unfollow', verifyToken, unfollowUser);

export default router;
