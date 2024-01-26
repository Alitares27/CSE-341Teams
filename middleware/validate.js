const validator = require("../helpers/validate");

const savePlayer = (req, res, next) => {
  const validationRule = {
    name: "required|string",
    lastName: "required|string",
    birthday: "required|string",
    country: "required|string",
    city: "required|string",
    naFoTeam: "required|string",
    club: "required|string",
    position: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePlayer,
};
