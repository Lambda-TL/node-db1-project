exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name && req.body.budget) {
    const name = req.body.name.trim();
    const budget = req.body.budget;

    if (typeof name !== "string") {
      res.status(400).json({ message: "name of account must be a string" });
    }

    if (typeof budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" });
    }

    if (name.length < 3 || name.length > 100) {
      res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    }

    next();
  } else {
    res.status(400).json({ message: "name and budget are required" });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
};
