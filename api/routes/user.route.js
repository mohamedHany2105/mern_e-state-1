import Router from 'express';
import {verifyToken} from '../utils/verifyToken.js'
import {getAllUsers, getOneUser,  updateUser, deleteUser,getUserService} from '../controllers/user.controller.js'

const userRouter =Router();

userRouter.get('/users',getAllUsers)
userRouter.get('/user/:id',verifyToken,getOneUser)
userRouter.post('/update/:id',updateUser)
userRouter.delete('/delete/:id',deleteUser)
userRouter.get('/service/:id',getUserService)


export default userRouter;
