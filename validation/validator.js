import { object, ref, string } from "yup";

export const registerDoctorSchema = object({
  username: string().min(5, "Username need at least 5 letters").required("Username Require"),
  password: string().min(6, "Password need at least 6 letters").required("Password Require"),
  specialization: string().required("Special is require"),
   confirmPassword: string().oneOf(
    [ref("password"),null],"Password not Match"),
})

export const registerUserSchema = object({
  username: string().min(5, "Username need at least 5 letters").required("Username Require"),
  password: string().min(6, "Password need at least 6 letters").required("Password Require"),
   confirmPassword: string().oneOf(
    [ref("password"),null],"Password not Match")
})

export const loginSchema = object({
  username: string().min(5, "Username need at least 5 letters").required("Username Require"),
  password: string().min(6, "Password need at least 6 letters").required("Password Require"),
})

export const validate = (schema) => async (req, res ,next)=> {
  try{
    await schema.validate(req.body, {abortEarly:false});
    next();
  }catch(error){
    const errMsg = error.errors.map((item)=>item);
    const errTxt = errMsg.join(",")
    console.log(errTxt);
    const mergeErr = new Error (errTxt)
    next(mergeErr);
  }
}