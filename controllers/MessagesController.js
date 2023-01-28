import { socketEmit } from "../services/socket";
import joi from 'joi'
import { Users } from "../models";
import Messages from "../models/Messages";
import HttpError from "http-errors";

export class MessagesController {
  static send = async (req, res, next) => {
    try {
      const { text, friendId } = req.body;

      const { userId } = req;

      let message = await Messages.create({
        text,
        from: userId,
        to: friendId
      })
      message = await Messages.findOne({
        where: { id: message.id },
        include: [{
          model: Users,
          as: 'user',
          where: {
            id: userId,
          }
        }]
      })
      socketEmit(friendId, 'new-message', message)
      res.json({
        status: 'ok',
        message
      })
    } catch (e) {
      next(e)
    }
  }
}

export default MessagesController;
