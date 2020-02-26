const db = require('../models/db');
//var popup = require('popups');

module.exports.enumTest = function (req, res) {
  var val = req.query.value
  var password = req.query.password

  console.log(`Value: ${val}`);

  if(val) {
    db.client.query(`SELECT list_name FROM lists WHERE list_name='${val}'`, (err, result, rows)=>{
      res.send(result)
    });
  }

  else{
    res.redirect('back')
  }

//  res.end('/login');'''
// Groceries
// Homework
// Hardware Store
// Weekend Errands

};
