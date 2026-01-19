import express from 'express';
import {getItems} from ''
import { getItembyId } from './items';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;



app.use(express.json());

app.use(express.static('public'));

// api root
app.get('/api', (req, res) => {
  res.send('Welcome to my REST API!');
});

//get all items
app.get('/items',);

//get item base on id
app.get('/items(:id', getItembyId);

//todo add put route for items
app.put('items/:id', (req,res) => {
  console.log('updating item id:', req.params.id);
  const itemIndex = items.findIndex((item) => item.id == req.params.id)
});
//todo add delete route for items



//add new item
app.post('/items', postNewItem);



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


