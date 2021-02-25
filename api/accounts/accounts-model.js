const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts").select("*");
};

const getById = (id) => {
  return db("accounts").where({ id });
};

const create = async (account) => {
  const account_id = await db("accounts").insert(account).returning("id");
  return getById(account_id);
};

const updateById = async (id, account) => {
  await db("accounts").where({ id }).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  const account = getById(id);
  await db("accounts").where({ id }).del();
  return account;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
