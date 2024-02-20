import { Router } from 'express';
import { getComments, addComment } from '../controllers/comments.js';
import { authorize } from '../middleware/authorize.js'

const router = Router();

router.get('/:id', authorize, getComments);
router.post('/:id', authorize, addComment);


export default router;