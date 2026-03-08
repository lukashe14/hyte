import express from 'express';
import {getMe, getUsers, postLogin, postUser, deleteUserById} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter.route('/')
// GET all users
.get(authenticateToken, getUsers)
// POST new user
.post(postUser);

userRouter.delete('/',authenticateToken, deleteUserById);

// POST user login
userRouter.post('/login', postLogin);

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);



export default userRouter;
