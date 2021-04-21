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
          'Add department',
          'Add role',
          'Add employee',
          'View all employees',
          'View all employees by department',
          'View all employees by role',
          'Update employee role',
          'exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Add department':
            //addDept();
            console.log(answer.action);
            break;
  
          case 'Add role':
            // addRole();
            console.log(answer.action);
            break;
  
          case 'Add Employee':
            // addEmployee();
            console.log(answer.action);
            break;
  
          case 'View all employees':
            // viewAllEmployees();
            console.log(answer.action);
            break;

          case 'View all employees by department':
            // viewAllEmployeesDept();
            console.log(answer.action);
            break;

          case 'View all employees by role':
            // viewAllEmployeesRole();
            console.log(answer.action);
            break;

          case 'Update employee role':
             // viewAllEmployeesRole();
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