import { validationResult } from 'express-validator';


const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400)
      .json({message: 'invalid input data', errors: errors.array()});
    }
    next();
};

export {validationErrorHandler};
