const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : "160.153.129.30",
  user     : "mangosoft_user",
  password : "M4ng050ft",
  database : "testing_nodejs"
});

module.exports = connection;
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();