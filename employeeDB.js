const mysql = require('mysql');
const inquirer = require('inquirer');
const queries = require('./sqlLib/queries');
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

//Initiate connection to employee database
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  mainMenu();
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
          'View department, role, or employee',
          'Update employees',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'Add department, role, or employee':
            addData();
            break;
  
          case 'View department, role, or employee':
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

//--------------------------------//

const viewDeptsForRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      let deptArray = [];
      res.forEach(({id, dept_name}) => {
        deptArray.push(`${id} ${dept_name}`);
      })
      addRole(deptArray);  
    });
    
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
          viewDeptsForRole();
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
  inquirer
      .prompt([
          {
          type: 'input',
          name: 'dept',
          message: "Please input the department:",
          // validate: validateString,
          },
          
      ])
      .then((data) => {
       const query = "INSERT INTO department SET ?";
       connection.query(query, {dept_name: `${data.dept}`}, (err, res) => {
        if(err) throw(err);
        console.log(`You have added the ${data.dept} department to the database.`)
        mainMenu();
       }) 
    });
};

//Add a role to the database
const addRole = (depts) => {
  inquirer
      .prompt([
          {
          type: 'input',
          name: 'title',
          message: "Please input the title of this role:",
          // validate: validateString,
          },

          {
            type: 'input',
            name: 'salary',
            message: "Please input the salary of this role:",
            // validate: validateString,
          },

          {
            type: 'list',
            name: 'dept',
            message: "Please add a department for this role:",
            choices: [...depts],
            // validate: validateString,
          },
          
      ])
      .then((data) => {
      console.log(data.dept);
      //  const query = "INSERT INTO role SET ?";
      //  connection.query(query, {title: `${data.title}`, salary: `${data.salary}`, }, (err, res) => {
      //   if(err) throw(err);
      //   console.log(`You have added the ${data.dept} department to the database.`)
      //   mainMenu();
      //  }) 
    });
};

//----------------------------//

//Submenu to view employee data
const viewData = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
        'All Employees',
        'Roles',
        'Departments',
        'Return to main menu',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'All Employees':
          allEmployees();
          break;

        case 'Roles':
          viewRoles();
          break;

        case 'Departments':
          viewDepts();
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
    mainMenu();
  });
};

//View departments
const viewDepts = () => {
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      const p = new Table();
      res.forEach(({dept_name}) => {
        p.addRow({Department: `${dept_name}`});
      });
      p.printTable();
        mainMenu();  
    });
};

//View Roles
const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    const p = new Table();
    res.forEach(({title, salary}) => {
      p.addRow({Title: `${title}`, Salary: `${salary}`});
    });
    p.printTable();
      mainMenu();  
  });
}



 
