DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employeeTracker (
    id INT NOT NULL AUTO_INCREMENT,
    departments VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL,
    employees VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    FOREIGN KEY (employeeTracker_id)
    REFERENCES employeeTracker(id),
    PRIMARY KEY (id)
);
