import { Notes, Users } from "../models";
import _ from "lodash";
import HttpError from "http-errors";
import JWT from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { v4 as uuidV4 } from "uuid";

const { JWT_SECRET } = process.env;

class UsersController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({
        where: { email },
      });
      if (!user || user.getDataValue("password") !== Users.passwordHash(password)) {
        throw HttpError(403, "Invalid email or password");
      }
      const token = JWT.sign({ userId: user.id }, JWT_SECRET);

      res.json({
        status: "ok",
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };
  static register = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { file } = req;
      const exists = await Users.findOne({
        where: { email },
      });
      const errors = {};
      if (exists) {
        errors.email = "Email already exist";
      }

      if (!_.isEmpty(errors)) {
        throw HttpError(422, { errors });
      }
      const user = await Users.create({ firstName, lastName, email, password });

      if (file) {
        const avatar = path.join('/images', uuidV4() + '-' + file.originalname);
        fs.writeFileSync(path.join(__dirname, '../public', avatar), file.buffer);
        user.avatar = avatar;
        await user.save();
      }

      const token = JWT.sign({ userId: user.id }, JWT_SECRET);

      res.json({
        status: "ok",
        user,
        token,
      });
    } catch (e) {
      next(e);
    }
  };
  static profile = async (req, res, next) => {
    try {
      const { userId } = req;
      const user = await Users.findByPk(userId);
      res.json({
        status: "ok",
        user,
      });
    } catch (e) {
      next(e);
    }
  };
  static list = async (req, res, next) => {
    try {
      const { page = 1, s } = req.query;
      const limit = 20;

      const where = {
        id: { $not: req.userId }
      };

      if (s) {
        where.$or = [
          { firstName: { $substring: s } },
          { lastName: { $substring: s } },
          { email: { $substring: s } },
        ]
      }

      const users = await Users.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
      });

      const total = await Users.count({
        where
      });

      res.json({
        status: "ok",
        users,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (e) {
      next(e);
    }
  };
}

export default UsersController;
