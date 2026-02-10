import promisePool from "../utils/database.js";

//TODO: lisää modelit ja muokkaa kontrollerit reiteille:
//GET /api/users - list all users
//GET /api/users/:id - get user by id
//POST /api/users - add a new user

const GetUsers = async (users) => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await promisePool.execute(sql, [users]);
  return rows[0];
};

const GetUserById = async (users) => {
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [users]);
  return rows[0];
};

const addUser = async (users) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [users]);
  return rows[0];
};

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (Users) => {
  const sql = 'INSERT INTO Users (user_id, username, password, email) VALUES(?,?,?,?) ';
  const [rows] = await promisePool.execute(sql, [Users]);
  return rows[0];
};

export {GetUsers,GetUserById,addUser,findUserByUsername};
