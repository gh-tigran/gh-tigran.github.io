import express from "express";
import UsersController from "../controllers/UsersController";
import validate from "../middlewares/validate";
import usersScheme from "../schemas/usersScheme";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
})

router.post("/login", UsersController.login);

router.post("/register", upload.single('avatar'), validate(usersScheme.register), UsersController.register);

router.get("/profile", UsersController.profile);

router.get("/list", UsersController.list);

export default router;
