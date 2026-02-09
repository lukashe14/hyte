import express from 'express';
import cors from 'cors';
import itemRouter from './routes/item-router.js';
import userRouter from './routes/user-router.js';
import requestLogger from './middlewares/logger.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

//enable CORS requests
app.use(cors());


// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

//oma loggeri middleware, käytössä koko sovelluksen laajuisesti eli käsittelee kaikki htp-pyynnöt
app.use(requestLogger);

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// Endpoints for 'items' resource
// Get all items

app.use('/api/items', itemRouter);


//Users resource router for all /api/users routes
app.use('/api/users', userRouter)


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
