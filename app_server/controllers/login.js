const request = require('request');

let apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sbr2020.herokuapp.com';
}

const renderPage = function(req, res) {
  res.render('login', {
    title: 'Login'
  });
};

module.exports.enumLogin = function (req, res) {
  renderPage(req, res);
};
