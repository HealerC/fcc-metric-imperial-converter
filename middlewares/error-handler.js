const errorHandler = (err, req, res, next) => {
  return res.status(400).json({err: err.message});
}
module.exports = errorHandler;