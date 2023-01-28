import HttpError from "http-errors";
import _ from 'lodash'

const validate = (schema) => (req, res, next) => {
  try {
    const validate = schema.unknown().validate(req, { abortEarly: false });
    if (validate.error) {
      const errors = {};

      validate.error.details.forEach(error => {
        const [, ...path] = error.path;

        _.set(errors, path, error.message.replace(/^"\w+\./, '"'))
      })

      throw HttpError(422, { errors })
    }
    next()
  } catch (e) {
    next(e);
  }
}

export default validate;
