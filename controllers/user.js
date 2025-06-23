import prisma from "../configs/prisma.js";
import bcrypt from "bcryptjs";


export const updateUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username,password } = req.body;
    console.log(id, username)
    const hashpassword = bcrypt.hashSync(password,10)
    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
       data:{
        username:username,
        password: hashpassword
      }
    })
    res.json({ message: `Updated username to ${user.username} Successful`,password});
  } catch (error) {
    next(error);
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id)
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id)
      },
      omit: {
        password: true
      }
    })

    res.json({ id: user.id, username: user.username })
  } catch (error) {
    next(error);
  }
};