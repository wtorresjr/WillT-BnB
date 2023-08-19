const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const checkQueryParams = [
  check("page")
    .optional()
    .isInt({ max: 10 })
    .withMessage("Page maximum is 10")
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),

  check("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1")
    .isInt({ max: 20 })
    .withMessage("Size maximum is 20"),

  check("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),

  check("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),

  check("minLat")
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),

  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),

  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),

  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
];

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const checkQueryErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.path] = error.msg));

    const err = Error("Bad Request");

    return _res.status(400).json({ message: "Bad Request", errors });
  }
  next();
};

module.exports = {
  checkQueryErrors,
  checkQueryParams,
};
