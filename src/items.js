//dummy mock data (nollautuu aina, kun sovellus käynnistyy uudelleen)
const items =[
  {id: 1, name:'Omena'},
  {id: 2, name:'Appelsiini'},
  {id: 3, name:'Banaani'},
];

const getItems = (req, res) => {
  res.send('items');
};

const getItembyId = (req, res) => {
  console.log('Getting item id:', req.params.id);
  const itemfound = items.find(item => item.di == req.params.id);
  if (itemfound) {
  res.send('items');
  } else {
    res.status(404).json({message:'item not found'});
  }
};



const postNewItem = (req, res) => {
  //console.log('add item request body', req.body)
  //todo: lisää id listaan lisättävälle objektille
  const newId = items.lenght >0 ? Math.max(...items.map(item => item.id)) +1 : 1;
  const newItem = { id:newId, ...req.body };
  items.push(newItem);
  res.status(201),({message:"new item added"});
};

export {getItems, getItembyId};
