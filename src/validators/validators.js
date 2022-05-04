const Joi = require("joi");

// validators
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = validateCourse;
