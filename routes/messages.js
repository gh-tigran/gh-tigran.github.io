import express from "express";
import MessagesController from "../controllers/MessagesController";
import validate from "../middlewares/validate";
import messagesScheme from "../schemas/messagesScheme";

const router = express.Router();



router.post("/send", validate(messagesScheme.send), MessagesController.send);

export default router;
