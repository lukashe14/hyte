import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {addUser, findUserByUsername, listAllUsers, removeUserById} from '../models/user-model.js';


const getUsers = async (req, response) => {
  const users = await listAllUsers();
  response.json(users);
};


// Käyttäjän lisäys (rekisteröityminen)
const postUser = async (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }
  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);

  // Lasketaan salasanasta tiiviste (hash)
  const hash = await bcrypt.hash(newUser.password, 10);
  //console.log('salasanatiiviste:', hash);
  // Korvataan selväkielinen salasana tiivisteellä ennen kantaan tallennusta
  newUser.password = hash;
  const newUserId = await addUser(newUser);
  vastaus.status(201).json({message: 'new user added', user_id: newUserId});
};

//yritystehdä deleteuserbyid
const deleteUserById = async (req, res) => {
  const affectedRows = await removeUserById(req.params.id, req.user.user_id);
  if (affectedRows > 0) {
    res.json({message: 'entry deleted'});
  } else {
    res.status(404).json({message: 'entry not found'});
  }
};

// Tietokantaversio valmis
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user from db', user);
  if (user) {
    // jos asiakkaalta tullut salasana vastaa tietokannasta haettua tiivistettä, ehto on tosi
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      // generate & sign token using a secret and expiration time
      // read from .env file
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

// Get user information stored inside token
const getMe = (req, res) => {
  res.json(req.user);
};

export {getUsers, postUser, postLogin, getMe, deleteUserById};
