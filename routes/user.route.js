import express from 'express';
import { getUsers, updateUsers } from '../controllers/user.js';
import { authCheck } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get("/me", authCheck, getUsers);
router.patch("/me/:id", authCheck, updateUsers);


export default router;