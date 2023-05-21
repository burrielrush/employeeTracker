## SQL Employee Tracker
# Description
This code is an implementation of an employee tracker application using Node.js and MySQL. It allows you to perform various operations related to employees, roles, and departments, such as viewing data, adding new entries, and updating employee roles.

-The necessary packages, mysql2 and inquirer, are imported using the require statement.<br>
-The PORT variable is set to either the value of the process.env.PORT environment variable or 3001 as the default port.<br>
-The code establishes a connection to the MySQL database using the mysql2 package. The database connection details, such as the host, user, password, and database name, are specified in the db object.<br>
-The connection to the database is checked, and if successful, the start() function is called.<br>
-The start() function presents a list of options to the user through the inquirer package. Based on the selected option, a corresponding function is executed.<br>
-Functions like viewEmployee(), viewRoles(), and viewDepartment() execute SQL queries to retrieve and display data from the database.<br>
-The addEmployee(), addDepartment(), and addRoles() functions allow the user to add new employees, departments, and roles, respectively, by prompting for input and inserting the data into the database.<br>
-The updateRoles() function enables updating an employee's role by presenting a list of employees and available roles for selection.<br>
-Each function, after completing its respective operation, calls the start() function again to display the options menu.<br>
-The code follows a sequential flow, presenting prompts to the user and performing the requested actions using MySQL queries.<br>


# Table of Contents
-Installation<br>
-Usage<br>
-Database Schema<br>
-License<br>

# Installation
-Add code from github repo to personal computer<br>
-Run npm start<br>


# Usage
-Run npm start<br>
-Follow prompts<br>
-Database will be updated per user input<br>

# Database Schema

DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL
);


CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    role_id INT,
    manager_id INT NULL
);





License
MIT License 

<img width="565" alt="Screenshot 2023-05-20 at 4 49 17 PM" src="https://github.com/burrielrush/employeeTracker/assets/123046249/0ab0d073-65ec-4606-bd9d-d42f5f4dfdf7">

