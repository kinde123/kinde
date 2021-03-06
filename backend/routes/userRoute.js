import express from "express";
import User from "../models/userModel";

const router = express.Router();

router.post('/signin', async (req,res) =>{
  const signinUser = await User.findOne({
    email: req.body.email,
    password:req.body.password,
  });
  if(signinUser){
res.send({
  _id: signinUser.id,
  name: signinUser.name,
  email: signinUser.email,
  isAdmin: signinUser.isAdmin,
  token: getToken(signinUser), //npm install jsonwebtoken
})
  } else{
    res.status(401).send({msg:'Invalid Email or Password.'});
  }
})

router.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Kinde',
      email: 'kindetadesse5@gmail.com',
      password: 'Aga571604',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;