const router = require("express").Router();
const loginRouter = require("./login");
const signupRouter = require("./signup");
const { restoreUser } = require("../../utils/auth");
const currentUser = require("./current-user");
const spotRouter = require("./spot");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./booking");

router.use(restoreUser);

router.use("/login", loginRouter);

router.use("/signup", signupRouter);

router.use("/current-user", currentUser);

router.use("/spots", spotRouter);

router.use("/reviews", reviewsRouter);

router.use("/bookings", bookingsRouter);

router.get("/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
