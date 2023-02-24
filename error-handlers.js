exports.pathError = (req, res, next) => {
  res.status(404).send({ message: "Path Not Found" });
};

exports.customError = (err, req, res, next) => {
  const { status, message } = err;
  if (status) res.status(status).send({ message });
  else next(err);
};

exports.serverError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
};
