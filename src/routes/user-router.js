import express from 'express';
import { deleteUserById, getMe, getUserById, getUsers, postLogin, postUser, putUserById } from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const userRouter = express.Router();

//User resource endpoints

userRouter.route('/')
//get all users
.get(getUsers)
// Post new user
.post(postUser)
// get user by id
.get(getUserById)
//put user by id
.put(putUserById)
//delete user by id
.delete(deleteUserById);


//post user login
userRouter.post('/api/users/login', postLogin);

userRouter.get('/me', authenticateToken, getMe);


export default userRouter;
