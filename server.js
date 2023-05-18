const mysql = require("mysql2");
const inquirer = require("inquirer");
const PORT = process.env.PORT || 3001;
// Imports the necessary packages (mysql2 and inquirer) and assigns them to variables

// Connect to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeeTracker_db",
});

// Check the database connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connecting to the database: ");
  start();
});
console.log("Connected to the employeeTracker_db database.");

// Add an employee to the database
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "Pick an option!",
      choices: [
        "See all Employees",
        "See all Roles",
        "See all Departments",
        "Add Employees to database",
        "Add Roles to database",
        "Add Departments to database",
        "Update Employees role",
        "Exit prompts",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View all Employees":
          viewEmployees();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Departments":
          viewDepartments();
          break;
        case "Add an Employee to the database":
          addEmployee();
          break;
        case "Add Roles to the database":
          addRole();
          break;
        case "Add Departments to the database":
          addDepartments();
          break;
        case "Change Roles in database":
          updateRole();
          break;
        case "Escape":
          db.end();
          break;
      }
    });
}

// Function to view all departments
function viewDepartments() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRoles() {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all employees
function viewEmployees() {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the department you would like to add?",
    })
    .then((answer) => {
      console.log(answer.name);
      const sql = `INSERT INTO department (department_name) VALUES ("${answer.name}")`;

      db.query(sql, (err, res) => {
        if (err) throw err;
        console.log(`Added department ${answer.name} to the database.`);
        start();
        console.log(answer.name);
      });
    });
}

// Function to add a role
function addRole() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    const departmentchoices = res.map((department) => {
      return {
        name: department.department_name,
        value: department.department_id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role you would like to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "Salary for this role:",
        },
        {
          type: "list",
          name: "department",
          message: "Which department does this role belong to?",
          choices: departmentchoices,
        },
      ])
      .then((answer) => {
        const departmentId = answer.department;
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(
          sql,
          [answer.title, answer.salary, departmentId],
          (err, res) => {
            if (err) throw err;
            console.log(`Added role ${answer.title} to the database.`);
            start();
          }
        );
      });
  });
}

// Function to add an employee

function addEmployee() {
  db.query(`SELECT * FROM role`, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstname",
          message:
            "What is the first name of the employee you would like to add?",
        },
        {
          type: "input",
          name: "lastname",
          message:
            "What is the last name of the employee you would like to add?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the role of the employee you would like to add?",
          choices: res.map((role) => role.title),
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the manager of the employee you would like to add?",
          choices: res.map((manager) => manager.title),
        },
      ])
      .then((answer) => {
        const role = res.find((role) => role.title === answer.role);
        const manager = res.find((manager) => manager.title === answer.manager);
        const sql = `INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [
          answer.first_name,
          answer.last_name,
          role.id,
          manager.id,
        ];

        db.query(sql, params, (err, res) => {
          if (err) throw err;
          console.log(
            `Added employee ${answer.first_name} ${answer.last_name} to the database.`
          );
          start();
        });
      });
  });
}

// Function to update an employee role
function updateEmployeeRole() {
  const sql = `SELECT * FROM employee`;
  const sqlRoles = `SELECT * FROM role`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    db.query(sqlRoles, (err, resRoles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: res.map((employee) => employee.first_name),
          },
          {
            type: "list",
            name: "role",
            message: "What is the new role of the employee?",
            choices: resRoles.map((role) => role.title),
          },
        ])
        .then((answer) => {
          const employee = res.find(
            (employee) => employee.first_name === answer.employee
          );
          const role = resRoles.find((role) => role.title === answer.role);
          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          const params = [role.id, employee.id];

          db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(
              `Updated employee ${answer.employee} to ${answer.role}.`
            );
            start();
          });
        });
    });
  });
}
