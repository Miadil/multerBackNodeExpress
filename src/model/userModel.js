const db = require("./db");

const findOne = async (id) => {
  try {
    const [movie] = await db.query("select * from `user` where id = ?", [id]);
    return movie;
  } catch (err) {
    console.log(err);
  }
};
const findByEmail = async (email) => {
  try {
    const [user] = await db.query("select * from `user` where email = ?", [
      email,
    ]);
    return user;
  } catch (err) {
    console.log(err);
  }
};
const addOne = async (user) => {
  try {
    const { name, email, password } = user;
    const [result] = await db.query(
      "insert into `user` (name, email, password) values (?,?,?)",
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  } catch (err) {
    console.log(err);
  }
};
module.exports = { findOne, addOne, findByEmail };
