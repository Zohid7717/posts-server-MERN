import { Router } from 'express';
import {checkAuth} from '../utils/checkAuth.js'
import { createPost, getAll, getById, getMyPosts, removePost } from '../controllers/posts.js';

const router = new Router()

//Create-posts
//http://localhost:300/api/posts
router.post('/', checkAuth, createPost)

//Get all posts
//http://localhost:300/api/posts
router.get('/', getAll)

//Get posts by id
//http://localhost:300/api/posts/:id
router.get('/:id', getById)

//Get My Posts
//http://localhost:300/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

//remove posts
//http://localhost:300/api/posts/:id
router.delete('/:id', checkAuth, removePost)


export default router