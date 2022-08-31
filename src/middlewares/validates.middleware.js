const { validationResult } = require('express-validator');

// eslint-disable-next-line consistent-return
const validates = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = validates;
