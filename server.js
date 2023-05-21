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


function start() {
  inquirer
    .prompt({
      type: "list",
      name: "start",
      message: "Pick an option!",
      choices: [
        "View all Employees",
        "View all Roles",
        "View all Departments",
        "Add Employees to database",
        "Add Role to database",
        "Add Department to database",
        "Update Employees role",
        "Exit prompts",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View all Employees":
          viewEmployee();
          break;
        case "View all Roles":
          viewRoles();
          break;
        case "View all Departments":
          viewDepartment();
          break;
        case "Add Employees to database":
          addEmployee();
          break;
        case "Add Role to database":
          addRoles();
          break;
        case "Add Department to database":
          addDepartment();
          break;
        case "Update Employees role":
          updateRoles();
          break;
        case "Exit prompts":
          db.end();
          break;
      }
    });
}


// Function to view all employees
function viewEmployee() {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all roles
function viewRoles() {
  const sql = `SELECT * FROM roles`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to view all departments
function viewDepartment() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

// Function to add an employee

function addEmployee() {
  db.query(`SELECT * FROM roles`, (err, res) => {
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
          name: "roles",
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
          answer.firstname,
          answer.lastname,
          role,
          manager.id,
        ];

        db.query(sql, params, (err, res) => {
          if (err) throw err;
          console.log(
            `Added employee ${answer.firstname} ${answer.lastname} to the database.`
          );
          start();
        });
      });
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
function addRoles() {
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
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: departmentchoices,
        },
      ])
      .then((answer) => {
        const departmentId = answer.department;
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
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


// Function to update an employee role
function updateRoles() {
  const sql = `SELECT * FROM employee`;
  const sqlRoles = `SELECT * FROM roles`;

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
            choices: res.map((employee) => employee.firstname),
          },
          {
            type: "list",
            name: "roles",
            message: "What is the new role of the employee?",
            choices: resRoles.map((roles) => roles.title),
          },
        ])
        .then((answer) => {
          const employee = res.find(
            (employee) => employee.firstname === answer.employee
          );
          const roles = resRoles.find((roles) => roles.title === answer.roles);
          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
          const params = [roles.id, employee.id];

          db.query(sql, params, (err, res) => {
            if (err) throw err;
            console.log(
              `Updated employee ${answer.employee} to ${answer.roles}.`
            );
            start();
          });
        });
    });
  });
}

