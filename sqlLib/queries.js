const mysql = require('mysql');

//Establish connection to employee database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employee_trackerdb',
});

//Initiate connection to employee database
connection.connect((err) => {
  if (err) throw err;
});

//View departments
const viewDepts = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        let deptArray = [];
        res.forEach(({dept_name}) => {
          deptArray.push(dept_name);
        })  
      });
      addRole(deptArray);
  };

module.exports = {
  viewDepts,
}

