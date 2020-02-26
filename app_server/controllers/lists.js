const request = require('request');
const _ = require('lodash');

let apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sbr2020.herokuapp.com';
}

const renderPage = function(req, res, body) {
  res.render('lists', {
    title: 'Your lists',
    lists: body
  });
};

module.exports.enumLists = function (req, res) {
  const path = '/api/lists';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    headers: { 'Cookie': req.get('Cookie') },
    json: { }
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderPage(req, res, body);
    }
  );
};
