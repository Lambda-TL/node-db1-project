const router = require("express").Router();
const accounts_model = require("./accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  accounts_model
    .getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkAccountId, (req, res, next) => {
  accounts_model
    .getById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch((err) => {
      next(err);
    });
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    accounts_model
      .create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch((err) => {
        next(err);
      });
  },
);

router.put("/:id", checkAccountId, (req, res, next) => {
  if (req.body.name || req.body.budget) {
    accounts_model
      .updateById(req.params.id, req.body)
      .then((account) => {
        res.status(200).json(account);
      })
      .catch((err) => next(err));
  } else {
    res
      .status(400)
      .json({
        message:
          "Please provide an updated name or budget for the given account",
      });
  }
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  accounts_model
    .deleteById(req.params.id)
    .then((deletedAcc) => {
      res.status(200).json({ deletedAcc });
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
