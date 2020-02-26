const request = require('request');

let apiOptions = {
  server: 'http://localhost:3000'
};
if(process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://sbr2020.herokuapp.com';
}

const renderPage = function(req, res) {
  res.render('register', {
    title: 'Register'
  });
};

module.exports.enumRegister = function (req, res) {
  renderPage(req, res);
};