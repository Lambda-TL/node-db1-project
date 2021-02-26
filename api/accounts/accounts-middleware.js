const accounts_model = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  if (req.body.name && req.body.budget) {
    let name = req.body.name;
    const budget = req.body.budget;

    if (typeof name !== "string") {
      res.status(400).json({ message: "name of account must be a string" });
    } else if (typeof budget !== "number") {
      res.status(400).json({ message: "budget of account must be a number" });
    } else if (budget < 0 || budget > 1000000) {
      res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else {
      req.body.name = name.trim();
      next();
    }
  } else {
    res.status(400).json({ message: "name and budget are required" });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const name = req.body.name.trim();
  let accounts = await accounts_model.getAll();

  accounts = accounts.filter((account) => account.name === name);

  if (accounts.length > 0) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  accounts_model
    .getById(req.params.id)
    .then((db_res) => {
      if (db_res) {
        next();
      } else {
        res.status(404).json({ message: "account not found" });
      }
    })
    .catch(() => {
      res.status(404).json({ message: "account not found" });
    });
};
