const router = require("express").Router();
const loginRouter = require("./login");
const signupRouter = require("./signup");
const { restoreUser } = require("../../utils/auth");
const currentUser = require("./current-user");
const spotRouter = require("./spot");

router.use(restoreUser);

router.use("/session", loginRouter);

router.use("/users", signupRouter);

// router.use("/current-user", currentUser);

router.use("/spots", spotRouter);

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
