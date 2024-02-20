import { Router } from 'express';
import { likePost } from '../controllers/likes.js';
import { authorize } from '../middleware/authorize.js'

const router = Router();

router.get('/:id', authorize, likePost);


export default router;