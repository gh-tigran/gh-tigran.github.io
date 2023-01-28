import joi from "joi";

const schemas = {
  register: joi.object({
    body: joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().min(4).max(20).required(),
    })
  }),
  login: joi.object({
    body: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    })
  })
}

export default schemas
