import Router from 'express';

import {signIn,signUp,signOut,google} from '../controllers/auth.controller.js'
const authRouter =Router();

authRouter.post('/signin',signIn);
authRouter.post('/signup',signUp);
authRouter.post('/signout',signOut);
authRouter.post('/google',google);

export default authRouter;
