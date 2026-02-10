// HUOM: mokkidata poisettu modelista
//import users from '../models/user-model.js';

import jwt from 'jsonwebtoken';

import { findUserByUsername } from "../models/user-model.js";


//TDODO: refaktoroi tietokanafunktiolle
const getUsers = (request, response)=> {
  // ÄLÄ IKINÄ lähetä salasanoja http vastauksessa
  for (let i=0; i<users.length; i++) {
    delete users[i].password;
    //sensuroi käyttäjän emailin
    //users[i].email = 'sensores';
  }
  response.json(users);
};

//TODO: getUserByID

// käyttäjän lisäys (rekisteröinti)
const postUser = (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

 // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
  users.push({id: newId, ...newUser});
  delete newUser.password;
  //console.log('users', users);
  vastaus.status(201).json({message: 'new user added', user_id: newId});
};

// Tietokantaversio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user form db', user)

  if (user) {
    if (user.password === password) {
      delete user.password;
      // generate and sign token using a secret and expriation time
      const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};


const getUserById = (req, res) => {
  console.log('getting user id:', req.params.id);
  const userFound = users.find((user) => user.id == req.params.id);
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const putUserById = (req, res) => {
  console.log('updating user id:', req.params.id);
  const userIndex = users.findIndex((item) => item.id == req.params.id);
  if (userIndex !== -1) {
    users[userIndex] = {...users[userIndex], ...req.body};
    res.json({message: 'user updated', user: users[userIndex]});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const deleteUserById = (req, res) => {
  console.log('deleting user id:', req.params.id);
  const userIndex = users.findIndex((user) => user.id == req.params.id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({message: 'user deleted'});
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const getMe = (req, res) => {
  res.json({...req.user});
};

export {getUsers, postUser, postLogin, getUserById, putUserById, deleteUserById, getMe};
