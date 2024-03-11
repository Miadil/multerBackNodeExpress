const db = require("./db");

const findAll = async () => {
  try {
    const [movies] = await db.query("select * from `movie`");
    return movies;
  } catch (err) {
    console.log(err);
  }
};

const findOne = async (id) => {
  try {
    const [movie] = await db.query("select * from `movie`where id = ?", [id]);
    return movie;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { findAll, findOne };
