const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const addData = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to add?',
        choices: [
          'Department',
          'Role',
          'Employee',
          'Return to main menu',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Department':
            addDepartment();
            break;
  
          case 'Role':
            // addRole();
            break;
  
          case 'Update employees':
            // addEmployee();
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


const addDepartment = () => {

}
