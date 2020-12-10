INSERT INTO department(name) VALUES("accounting"), ("sales"), ("legal");
INSERT INTO role(title, salary, department_id) VALUES("account manager", 75000, 1), ("sales manager", 95000, 2),("lead attorney", 125000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Ron", "Swanson", 1, null), ("Lee", "Ving", 2, 1),("Rick", "Rubin", 2, 1), ("Bob", "Barker", 3, null);