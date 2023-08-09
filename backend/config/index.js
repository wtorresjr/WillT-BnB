module.exports = {
  environment: process.env.NODE_ENV || process.env.NODE_DEV,
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
