const db = require('../models/db');

module.exports.getItems = function (req, res) {
  qtext = 'SELECT iid, item_name FROM items WHERE lid = $1;';
  qvalues = [req.params.lid];
  db.client.query(qtext, qvalues, (err, result) => {
    if (err) {
      console.log(err.stack);
      res.status(500).json(err.stack);
    } else {
      res.status(200).send(result.rows);
    }
  });
};

module.exports.addItem = function(req, res) {
  qtext = 'INSERT INTO items (lid, item_name) VALUES ($1, $2);';
  qvalues = [req.params.lid, req.body["item_name"]];
  console.log(req.body);
  if (!qvalues[1]) {
    errorMsg = 'A item name must be passed in as a string.';
    console.log(errorMsg);
    res.status(500).json(errorMsg);
    return;
  }
  db.client.query(qtext, qvalues, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (result.rowCount != 1) {
      errorMsg = 'INSERT didn\'t work as expected.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports.deleteItem = function(req, res) {
  qtext = 'DELETE FROM items WHERE iid = $1;';
  qvalues = [req.params.iid];
  db.client.query(qtext, qvalues, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (result.rowCount != 1) {
      errorMsg = 'DELETE didn\'t work as expected.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports.updateItem = function(req, res) {
  qtext = 'UPDATE items SET item_name=$2 WHERE iid=$1;';
  qvalues = [req.params.iid, req.body["item_name"]];
  if (!qvalues[1]) {
    errorMsg = 'A item name must be passed in as a string.';
    console.log(errorMsg);
    res.status(500).json(errorMsg);
    return;
  }
  db.client.query(qtext, qvalues, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else if (result.rowCount != 1) {
      errorMsg = 'UPDATE didn\'t work as expected.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  });
};
