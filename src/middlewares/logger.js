const requestLogger = (req, res, next) => {
  console.log('request', new Date().toLocaleDateString('fi-en'), req.method, req.url);
  if (req.body) {
    console.log('body:', req.body);
  }
  next();
};

export default requestLogger;
