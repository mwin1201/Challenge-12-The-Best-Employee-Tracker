INSERT INTO department (name)
    VALUES
        ("Accounting"),
        ("Human Resources"),
        ("Development"),
        ("Sales"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
    VALUES
        ("Executive", 250000, 4),
        ("Manager", 175000, 3),
        ("Intern", 100000, 5),
        ("Analyst", 125000, 2),
        ("Accountant", 115000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ("Mark", "Ross", 1, NULL),
        ("Harry", "Potter", 3, 1),
        ("Myles", "Marcus", 5, NULL),
        ("Jen", "Jordan", 4, 1),
        ("Sarah", "Bennett", 2, 1);