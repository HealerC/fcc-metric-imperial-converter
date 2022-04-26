const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(400).json({err: err.message});
}
module.exports = errorHandler;