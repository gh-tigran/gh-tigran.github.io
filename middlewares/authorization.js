import HttpError from "http-errors";
import JWT from "jsonwebtoken";

const EXCLUDE = ["/users/login", "/users/register"];
const { JWT_SECRET } = process.env;

export default function authorization(req, res, next) {
  try {
    const { authorization = "" } = req.headers;
    const { method } = req;
    if (method === 'OPTIONS' || EXCLUDE.includes(req.path)) {
      next();
      return;
    }
    const { userId } = JWT.verify(
      authorization.replace("Bearer ", ""),
      JWT_SECRET
    );

    req.userId = userId;

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
}
