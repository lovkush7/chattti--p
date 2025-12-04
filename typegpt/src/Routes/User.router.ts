import {Router} from "express"
// import Signup from "../controller/Signup.controller.ts";
import login from "../controller/auth/login.controller.ts";
import signupvalidation from "../middleware/signup.validation.ts";
import loginvalidation from "../middleware/login.middleware.ts";
import UserController from "../controller/auth/User.controller.ts";
import protectedRoute from "../middleware/protected.middleware.ts";
import uploadprofilepic from "../controller/auth/updateprofile.controller.ts";
import Signup from "../controller/auth/Signup.controller.ts";
// import UserController from "../controller/User.controller.ts";

const router = Router();

router.post("/signup",signupvalidation,Signup);
router.post("/login",loginvalidation,login);
router.post("/logout",UserController.logout);
router.get("/check",protectedRoute,UserController.check);
router.put("/updateprofile",protectedRoute,uploadprofilepic)


export default router;