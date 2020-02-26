const db = require('../models/db');

module.exports.getLists = function (req, res) {
  qtext = 'SELECT lid, list_name FROM lists WHERE uid = ($1);';
  qvalues = [req.user];
  if (!qvalues[0]) {
    errorMsg = 'Can\'t find session cookie';
    console.log(errorMsg);
    res.status(500).json(errorMsg);
    return;
  }

  db.client.query(qtext, qvalues, (err, result) => {
    if(err) {
      console.log(err.stack);
      res.status(500).json(err.stack);
    } else {
      res.status(200).json(result.rows);
    }
  });
};

module.exports.addList = function (req, res) {
  qtext = 'INSERT INTO lists (uid, list_name) VALUES ($1, $2);';
  qvalues = [req.user, req.body["list_name"]];
  if (!qvalues[0]) {
    errorMsg = 'A list name must be passed in as a string';
    console.log(errorMsg);
    res.status(500).json(errorMsg);
    return;
  }

  db.client.query(qtext, qvalues, (err, result) => {
    if(err) {
      console.log(err.stack);
      res.status(500).json(err.stack);
    } else if (result.rowCount != 1) {
      errorMsg = 'INSERT did\'t work as expected.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports.deleteList = function (req, res) {
  qtext = 'DELETE FROM lists WHERE lid = $1';
  qvalues = [req.params.lid];
  db.client.query(qtext, qvalues, (err, result) => {
    if(err) {
      console.log(err.stack);
      res.status(500).json(err.stack);
    } else if (result.rowCount != 1) {
      errorMsg = 'DELETE didn\'t delete any rows.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports.renameList = function (req, res) {
  qtext = 'UPDATE lists SET list_name=$2 WHERE lid=$1;';
  qvalues = [req.params.lid, req.body["list_name"]];
  if (!qvalues[1]) {
    errorMsg = 'A list name must be passed in as a string';
    console.log(errorMsg);
    res.status(500).json(errorMsg);
    return;
  }
  db.client.query(qtext, qvalues, (err, result) => {
    if(err) {
      console.log(err.stack);
      res.status(500).json(err.stack);
    } else if(result.rowCount != 1) {
      errorMsg = 'UPDATE didn\'t work as expected.';
      console.log(errorMsg);
      res.status(500).json(errorMsg);
    } else {
      res.sendStatus(200);
    }
  })
};
