import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";

export const updateDoctor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username , password ,specialization} = req.body;
    console.log(id, username ,specialization)
    const hashpassword = bcrypt.hashSync(password,10)
    const doctors = await prisma.doctor.update({
      where: {
        id: Number(id)
      },
       data:{
        username:username,
        password:hashpassword,
        specialization:specialization
      }
    })
    res.json({ message: `Updated username to ${doctors.username} Successful`,password,specialization});
  } catch (error) {
    next(error);
  }
}

export const getDoctor = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id)
    const doctors = await prisma.doctor.findFirst({
      where: {
        id: Number(id)
      },
      omit: {
        password: true
      }
    })

    res.json({ id: doctors.id, username: doctors.username , specialization: doctors.specialization})
  } catch (error) {
    next(error);
  }
};