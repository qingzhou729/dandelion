var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'dandelion',
});

connection.connect();

connection.query('SELECT * FROM user_info', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows);
});

connection.end();