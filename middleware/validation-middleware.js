const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);

    console.log(await schema.parse(req.body))
    next();
  } catch (err) {
    return next({ msg: err.errors[0].message, code: 400 });
  }
};

module.exports = validate;
