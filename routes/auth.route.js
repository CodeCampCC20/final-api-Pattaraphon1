import express from 'express';
import { doctorRegister, loginDoctor, loginUser, userRegister } from '../controllers/auth.js';
import { loginSchema, registerDoctorSchema, registerUserSchema, validate } from '../validation/validator.js';

const router = express.Router();

router.post("/register/doctor",validate(registerDoctorSchema),doctorRegister);
router.post("/register/user",validate(registerUserSchema),userRegister);
router.post("/login/doctor",validate(loginSchema),loginDoctor);
router.post("/login/user",validate(loginSchema),loginUser);

export default router;