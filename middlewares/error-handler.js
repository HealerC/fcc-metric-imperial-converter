const errorHandler = (err, req, res, next) => {
  return res.status(400).json({status: "error", err: err.message});
}
module.exports = errorHandler;