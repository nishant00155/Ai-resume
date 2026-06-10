const {Router}=require("express")
const {
    registerUserController,
    loginUserController,
    logoutUserController,
    profile
} = require("../controller/auth.controller") 

const {auth}= require("../middlewares/auth.middleware")






const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @abstraction Register a new user
 * @access Public
 */
authRouter.post("/register",registerUserController)

/**
 * @route POST /api/auth/login
 * @abstraction Login a user
 * @access Public
 */
authRouter.post("/login",loginUserController)

/**
 * @route GET /api/auth/logout
 * @abstraction Logout a user
 * @access Public
 */
authRouter.get("/logout",logoutUserController)

/**
 * @route GET /api/auth/profile
 * @abstraction Get user profile
 * @access Private  
 */
authRouter.get("/profile",auth,profile)






module.exports = authRouter

