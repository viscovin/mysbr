const request = require('request');

let apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sbr2020.herokuapp.com';
}

const renderPage = function(req, res, body) {
  res.render('items', {
    title: 'Your items',
    items: body,
    lid: req.params.lid
  });
};

module.exports.enumItems = function (req, res) {
  const path = '/api/lists/' + req.params.lid;
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: { }
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, body);
    }
  );
};

module.exports.addItem = function (req, res) {
  const path = '/api/lists/' + req.params.lid;
  const postData = {
    item: req.body.item
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData
  };
  request(
    requestOptions,
    function(err, response, body) {
      module.exports.enumItems(req, res);
    }
  );
};
