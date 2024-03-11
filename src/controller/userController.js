const { findOne, addOne } = require("../model/userModel");
const validateUser = require("../validator/userValidator");
const { hashPassword } = require("../helper/argonHelper");

const getOne = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    if (isNaN(userId)) {
      throw new Error();
    }
    const [user] = await findOne(userId);
    res.send(user);
  } catch (err) {
    res.sendStatus(500);
  }
};

const createOne = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    //appel au validator validatorUser(req.body)
    const errors = validateUser(req.body);
    if (errors) {
      return res.status(401).send(errors);
    }
    const hashedPassword = await hashPassword(req.body.password);
    const result = await addOne({ ...req.body, password: hashedPassword });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = { getOne, createOne };
