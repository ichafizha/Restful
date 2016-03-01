var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'pets'
});

con.connect();

router.get('/', function(req, res) {
  con.query('SELECT * FROM cats', function(err, data) {
    if (err)
      console.log(err);

    res.json({
      data,
      status: 'success'
    });
  });
});

router.get('/:nama', function(req, res) {
  con.query('SELECT * FROM cats WHERE ?', req.params, function(err, data) {
    if (err)
      console.log(err);

    res.json({
      data,
      status: 'data satuan muncul'
    })
  })
})

router.post('/', function(req, res) {
  var data = {};
  data.nama = req.body.nama;
  data.jenis = req.body.jenis;
  data.umur = req.body.umur;

  con.query('INSERT INTO cats SET ?', data, function(err, data) {
    console.log(data);
    if (err)
      console.log(err);

    res.json({
      data,
      status: 'cat has been added'
    });
  });
});

router.delete('/:nama', function(req, res) {
  con.query('DELETE FROM cats WHERE ?', req.params, function(err, data) {
    if (err)
      console.log(err);

    res.json({
      data,
      status: 'cat has been deleted'
    });
  });
});

router.put('/:nama', function(req, res) {
  console.log(req.body);
  console.log(req.params);
  con.query('UPDATE cats SET ? WHERE ?', [req.body, req.params], function(err, data) {
    if (err)
      console.log(err);

    res.json({
      data,
      status: 'cat has been updated'
    });
  });
});

module.exports = router;
