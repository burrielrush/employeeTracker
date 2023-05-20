INSERT INTO department (department_name)
VALUES 
    ("Management"),
    ("Medical"),
    ("Production");

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Center Manager", 100000, 1),
  ("Assistant Manager", 75000, 1),
  ("Nurse", 75000, 2),
  ("Phlebotomist", 60000, 3);

INSERT INTO employee (firstname, lastname, role_id, manager_id)
VALUES
  ("Mickey", "Moose", 1, NULL),
  ("Bob", "Roberts", 2, 1),
  ("Courtney", "Foods", 3, 1),
  ("Russ", "Burrito", 4, 1);