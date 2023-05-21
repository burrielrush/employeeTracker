## SQL Employee Tracker
# Description


# Table of Contents
-Installation
-Usage
-Database Schema
-License

# Installation
-Add code from github repo to personal computer
-Run npm start


# Usage
-Run npm start
-Follow prompts
-Database will be updated per user input

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

