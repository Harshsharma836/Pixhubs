import { Router } from 'express';
import { addPost, getPost, deletePost } from '../controllers/posts.js'
import { authorize } from '../middleware/authorize.js'

const router = Router();

router.post('/',authorize, addPost);
router.get('/',authorize, getPost);
router.delete('/:id',authorize, deletePost);


export default router;