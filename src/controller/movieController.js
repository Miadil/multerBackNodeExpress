const { findAll, findOne } = require("../model/moviesModel");

const getAll = async (req, res) => {
  try {
    const movies = await findAll();
    res.send(movies);
  } catch {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const movieId = parseInt(req.params.id, 10);

  try {
    if (isNaN(movieId)) {
      throw new Error();
    }
    const [movie] = await findOne(movieId);
    res.send(movie);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = { getAll, getOne };
