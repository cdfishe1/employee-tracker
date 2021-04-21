const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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

const start = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add department, role, or employee',
          'View employees',
          'Update employees',
          'exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Add department, role, or employee':
            //addData();
            console.log(answer.action);
            break;
  
          case 'View employees':
            // viewEmployees();
            console.log(answer.action);
            break;
  
          case 'Update employees':
            // updateEmployee();
            console.log(answer.action);
            break;
  
          case 'View all employees':
            // viewAllEmployees();
            console.log(answer.action);
            break;
  
          case 'Exit':
            connection.end();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      })
    
        
  };


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
  });