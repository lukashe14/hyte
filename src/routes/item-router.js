import express from 'express';
import { deleteItemById, getItemById, getItems, postNewItem, putItemById } from '../controllers/item-controller.js';


const itemRouter = express.Router();


itemRouter
.route('/')
.get(getItems)
.post(postNewItem);
// Get item based on id
itemRouter
//define sub route
.route('/:id')
//get item based on id
.get(getItemById)
//put route for items
.put(putItemById)
//delete route for items
.delete(deleteItemById);



// Add new item


export default itemRouter;
