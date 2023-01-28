import joi from "joi";

const messagesScheme = {
  send: joi.object({
    body: joi.object({
      text: joi.string().required(),
      friendId: joi.number().required()
    })
  })
}

export default messagesScheme
