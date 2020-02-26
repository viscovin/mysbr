const request = require('request');

let apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sbr2020.herokuapp.com';
}

const renderPage = function(req, res) {
  res.render('test', {
    title: 'Test',
//    rows: body.rows
  });
};

module.exports.enumTest = function (req, res) {
  const path = '/api/test';
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
