import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/createError.js";

export const doctorRegister = async (req, res ,next) => {
  try{
    const {username, password, confirmPassword ,specialization} = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username,
      }
    });
    console.log(doctor)
    if(doctor){
      createError(400, "Username already Exist");
    }


    const hashPassword = bcrypt.hashSync(password, 10);
    
    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        confirmPassword: hashPassword,
        specialization: specialization
      }
    })

    res.json({message: `Register ${result.username} Successfully`})

  }catch(error){
    next(error)
  }
}

export const userRegister = async (req, res ,next) => {
  try{
    const {username, password, confirmPassword} = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      }
    });
    console.log(user)
    if(user){
      createError(400, "Username alreadt Exist");
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    
    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
        confirmPassword: hashPassword,
      }
    })

    res.json({message: `Register ${result.username} Successfully`})

  }catch(error){
    next(error)
  }
}

export const loginDoctor = async (req,res,next) => {
  try{
    const { username, password } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username,
      }
    });
    if(!doctor){
      createError(400, "Username or Password is Invalid");
    }

    const checkPassword = bcrypt.compareSync(password, doctor.password);
    if(!checkPassword){
      createError(400,"Password is Invalid");
    }

      const payload = {
        id: doctor.id,
      }
      const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'});
      res.json({
        payload: payload,
        message: `Welcome ${doctor.username}`,
        specialization: doctor.specialization,
        token: token
      })

      res.json({message:"Login Doctor"})
  }catch(error){
    next(error)
  }
}
  

export const loginUser= async (req,res,next) => {
  try{
    const { username, password} = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      }
    });
    if(!user){
      createError(400, "Username or Password is Invalid");
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password);
    console.log(password)
    console.log(checkPassword)
    if(!checkPassword){
      createError(400,"Password is Invalid");
    }

      const payload = {
        id: user.id,
      }
      const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'});
      res.json({
        payload: payload,
        message: `Welcome ${user.username}`,
        token: token
      })

      res.json({message:"Login User"})
  }catch(error){
    next(error)
  }
}