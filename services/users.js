const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.json");
const db = require("../helpers/db");
const User = db.User;

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret, {
      expiresIn: "7d",
    });
    return { ...user.toJSON(), token };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  console.log("finding id: ", id);
  return await User.findById(id);
}

async function create(userParam) {
  const user = await User.findOne({ email: userParam.email });
  if (user) throw `This email already exists: ${userParam.email}`;
  const newUser = new User(userParam);
  if (userParam.password) {
    newUser.password = bcrypt.hashSync(userParam.password, 10);
  }
  await newUser.save();
}

async function update(id, userParam) {
  console.log(id, userParam);
  const user = await User.findById(id);
  console.log(user.email, userParam.email);
  if (!user) throw "User not found.";
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw `User with email ${userParam.email} already exist.`;
  }
  if (userParam.password) {
    userParam.password = bcrypt.hashSync(userParam.password, 10);
  }
  Object.assign(user, userParam);
  await user.save();
}

async function _delete(id) {
  await User.findByIdAndDelete(id);
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};