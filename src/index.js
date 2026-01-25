import express from 'express';
import {deleteItemById, getItemById, getItems, postNewItem, putItemById} from './items.js';
import {deleteUserById, getUsers,getUserById, putUserById, postUser, postLogin } from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Endpoints for 'items' resource
// Get all items
app.get('/api/items', getItems);
// Get item based on id
app.get('/api/items/:id', getItemById);
// PUT route for items
app.put('/api/items/:id', putItemById);
// DELETE route for items
app.delete('/api/items/:id', deleteItemById);
// Add new item
app.post('/api/items', postNewItem);

//User resource endpoints
app.get('/api/users', getUsers);


// Post new user
app.post('api/users', postUser);


//post user login
app.post('/api/users/login', postLogin);


//itemssistä löytyy malli
//TODO: get user by id
app.get('api/users/:id', getUserById);
//app.get('/api/users/:id');

//TODO: put user by id
app.put('/api/users/:id', putUserById);

//TODO: delete user by id
app.delete('/api/users/:id', deleteUserById);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
