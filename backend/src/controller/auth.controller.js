const userModel = require("../models/user.model");
const tokenBlacklistingModel = require("../models/blacklist.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description Controller to handle user registration
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}


/**
 * @name loginUserController
 * @description Controller to handle user login
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password)
  //  internally hashes the plain text and checks if it matches the stored hash.

  if(!isPasswordValid){
    return res.status(400).json({
        message: "Invalid email or password",
    })
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token",token)

  res.status(200).json({
    message:"user loggedIn successfully",
    user:({
        id:user._id,
        username:user.username,
        email: user.email
    })
  })

}


/**
 * @name logoutUserController
 * @description Controller to handle user logout
 * @route GET /api/auth/logout
 * @access Public
 */
async function logoutUserController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlacklistingModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"user logged out successfully"
    })
}


/**
 * @name profile
 * @description Controller to get user profile
 * @route GET /api/auth/profile
 * @access Private
 */
async function profile(req,res){
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")   
    res.status(200).json({
        user:{
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
}




module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  profile
};
