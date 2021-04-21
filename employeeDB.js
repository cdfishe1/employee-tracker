const mysql = require('mysql');
const inquirer = require('inquirer');
// const addData = require('./addFunctions/addData');
const { Table } = require('console-table-printer');

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

//Begin main menu function
const mainMenu = () => {
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
            addData();
            break;
  
          case 'View employees':
            viewData();
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

//Submenu to ask to add data by department, role, or employee
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

        case 'Employee':
          // addEmployee();
          break;

        case 'Return to main menu':
          mainMenu();
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

//Add a department to the database
const addDepartment = () => {
};

//Submenu to view employee data
const viewData = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
        'All Employees',
        'Employees by Role',
        'Employees by Department',
        'Return to main menu',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'All Employees':
          allEmployees();
          break;

        case 'Employees by Role':
          // viewByRole();
          break;

        case 'Employees by Department':
          // viewByDept();
          break;

        case 'Return to main menu':
          mainMenu();
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

//View all employees
const allEmployees = () => {
  console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    const p = new Table();
    res.forEach(({  employee_id, first_name, last_name, }) => {
      p.addRow({ employee_id: `${employee_id}`, first_name: `${first_name}`, last_name: `${last_name}` });
    
    });
    p.printTable();
    connection.end();
  });
};

 
//Initiate connection to employee database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    mainMenu();
  });