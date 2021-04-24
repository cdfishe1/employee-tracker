const mysql = require('mysql');
const inquirer = require('inquirer');
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
          'Update employee role',
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
  
          case 'Update employee role':
            beginRoleUpdate();
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
          queryDeptsForAddRole();
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

//Queries the department table for the add role function
const queryDeptsForAddRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      let deptArray = [];
      res.forEach(({id, dept_name}) => {
        deptArray.push(`${id} ${dept_name}`);
      })
      addRole(deptArray);  
    });
};

//Add a role to the database
const addRole = (dept) => {
  
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
            choices: [...dept],
            // validate: validateString,
          },
          
      ])
      .then((data) => {
        const deptKeySplit = data.dept.split(' ');
        const deptKey = deptKeySplit[0];
        const deptName = deptKeySplit[1];
        const query = "INSERT INTO role SET ?";
        connection.query(query, {title: `${data.title}`, salary: `${data.salary}`, dept_id: `${deptKey}`}, (err, res) => {
          if(err) throw(err);
        const p = new Table();
        p.addRow({ Title: `${data.title}`, Salary: `${data.salary}`, Department: `${deptName}` });
        p.printTable();
        mainMenu();
       }) 
    });
};



const addEmployee = () => {

}

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
  const query = "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.dept_id = department.id";
  connection.query(query, (err, res) => {
    if (err) throw(err);
    const p = new Table();
    res.forEach(({  employee_id, first_name, last_name, title, salary, dept_name}) => {
          p.addRow({ Employee_ID: `${employee_id}`, First_Name: `${first_name}`, Last_Name: `${last_name}`, Title: `${title}`, Salary: `${salary}`, Department: `${dept_name}` });
        
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

//------------------------------//

//Update employee role
const beginRoleUpdate = () => {
  
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    let nameArray = [];
    res.forEach(({employee_id, first_name, last_name, role_id}) => {
      nameArray.push(`${first_name} ${last_name} ${employee_id} ${role_id}`);
    })
    queryRoles(nameArray);  
  });
  
};

const queryRoles = (names) => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    let roleArray = [];
    res.forEach(({id, title}) => {
      roleArray.push(`${id} ${title}`);
    })
    updateEmployeeRole(names, roleArray);  
  });
};

const updateEmployeeRole = (names, roles) => {
  
  inquirer
      .prompt([
          {
          type: 'list',
          name: 'name',
          message: "Please select a name:",
          choices: [...names],
          // validate: validateString,
          },

          {
            type: 'list',
            name: 'role',
            message: "Please select a role:",
            choices: [...roles],
            // validate: validateString,
            },
          
      ])
      .then((data) => {
        console.log(data)
        const nameSplit = data.name.split(' ');
        const roleSplit = data.role.split(' ');;
        const employeeName = `${nameSplit[0]} ${nameSplit[1]}`
        const employeeKey = nameSplit[2];
        const roleKey = roleSplit[0];
       const query = "UPDATE employee SET ? WHERE ?";
       connection.query(query, [{role_id: `${roleKey}`}, {employee_id: `${employeeKey}`}], (err, res) => {
        if(err) throw(err);
        allEmployees();
        mainMenu();
       }) 
    });

};



 
