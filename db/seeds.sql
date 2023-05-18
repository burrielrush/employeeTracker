INSERT INTO department (title)
VALUES 
    ("Management")
    ("Medical")
    ("Production")


INSERT INTO employee (department_id, title, firstname, lastname, salary, manager)
VALUES
  ("Management", "Center Manager", "Mickey", "Moose", "$100k", "None"),
  ("Management", "Assistant Manager", "Bob", "Roberts", "$75k", "Mickey Moose"),
  ("Medical", "Nurse", "Courtney", "Foods", "$75k", "Mickey Moose"),
  ("Production", "Phlebotomist", "Russ", "Burrito", "$60k", "Mickey Moose");



INSERT INTO role (title, salary, department_id)
VALUES
  ("Center Manager", "$100k","Management"),
  ("Assistant Manager", "$75k","Management"),
  ("Nurse", "$75k", "Medical"),
  ("Phlebotomist", "$60k", "Production");
