import express from 'express';
import { authCheck } from '../middlewares/auth.middleware.js';
import { getDoctor, updateDoctor } from '../controllers/doctors.js';

const router = express();

router.get("/me", authCheck, getDoctor);
router.patch("/me/:id", authCheck, updateDoctor );

export default router;