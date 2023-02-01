const whiteList = ['http://localhost:3000', 'https://mesto.levovskiiy.nomoredomainsclub.ru'];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestAccessControl = req.headers['access-control-request-headers'];

  if (whiteList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', requestAccessControl);
    return res.end();
  }

  return next();
};
