import express from "express";
import users from "./users";
import messages from "./messages";

const router = express.Router();

router.get("/", function (req, res, next) {
  try {
    res.json({
      status: "ok",
    });
  } catch (e) {
    next(e);
  }
});

router.use("/users", users);
router.use("/messages", messages);

export default router;
