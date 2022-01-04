const db = require("./db/connection");
const cTable = require("console.table");

// all the prompt arrays
const [
    mainMenu,
    deptPrompt,
    rolePrompt,
    empPrompt,
    updateEmpPrompt,
    updateEmpManagerPrompt,
    UtilizedBudgetPrompt,
    viewEmpByManagerPrompt,
    viewEmpByDeptPrompt,
    deleteRolePrompt,
    deleteEmpPrompt
] = require('./lib/index');
const inquirer = require("inquirer");
const validate = require('./utils/validate');

// initiate application with main menu
const init = () => {
    console.log(
        `========================
        EMPLOYEE TRACKER MAIN MENU
========================`
    );
    inquirer.prompt(mainMenu)
    .then((answer) => {
        switch(answer.userAction) {
            case "View all departments":
                viewDepts();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmps();
                break;
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmps();
                break;
            case "Update an employee role":
                updateEmpRole();
                break;
            case "Update employee manager":
                updateEmpManager();
                break;
            case "View employees by manager":
                viewEmpByManager();
                break;
            case "View employees by department":
                viewEmpByDept();
                break;
            case "Delete department":
                deleteDept();
                break;
            case "Delete role":
                deleteRole();
                break;
            case "Delete employee":
                deleteEmp();
                break;
            case "View utilized budget for department":
                utilizedBudget();
                break;
            default:
                close();
        }
    });
};

// view all departments
const viewDepts = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("ALL DEPARTMENTS")
        console.table(results);
    });
    setTimeout(() => {
        init();
    }, 1000);
};

// view all roles
const viewRoles = () => {
    const sql = `SELECT role.id, role.title, role.salary, department.name AS department FROM role
    INNER JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("All ROLES");
        console.table(results);
    });
    setTimeout(() => {
        init();
    }, 1000);
};

// view all employees
const viewEmps = () => {
    const sql = `SELECT A.id, CONCAT(A.first_name,' ', A.last_name) AS employee, role.title, department.name AS department, 
    role.salary, CONCAT(B.first_name,' ', B.last_name) AS manager
    FROM employee A
    LEFT JOIN employee B ON B.id = A.manager_id
    INNER JOIN role ON role.id = A.role_id
    INNER JOIN department ON department.id = role.department_id
    ORDER BY manager`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("All EMPLOYEES");
        console.table(results);
    });
    setTimeout(() => {
        init();
    }, 1000);
};

// add department
const addDept = () => {
    inquirer.prompt(deptPrompt)
    .then((answer) => {
        const errors = validate(answer, 'dept_name');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answer.addDepartment];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                addDept();
            }
            else {
                viewDepts();
            }
        });
    });
};

// add role
const addRole = () => {
    inquirer.prompt(rolePrompt)
    .then((answer) => {
        const errors = validate(answer, 'title', 'salary', 'deptId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
        const params = [answer.title, answer.salary, answer.deptId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                addRole();

            }
            else {
                viewRoles();
            }
        });
    });
};

// add employee
const addEmps = () => {
    inquirer.prompt(empPrompt)
    .then((answer) => {
        const errors = validate(answer, 'first_name', 'last_name', 'role_id', 'manager_id');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                addEmps();
            }
            else {
                viewEmps();
            }
        });
    });
};

// update employee role
const updateEmpRole = () => {
    inquirer.prompt(updateEmpPrompt)
    .then((answer) => {
        const errors = validate(answer, 'empId', 'role_id');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [answer.role_id, answer.empId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                updateEmpRole();
            }
            else {
                viewEmps();
            }
        });
    });
};

// update employee manager
const updateEmpManager = () => {
    inquirer.prompt(updateEmpManagerPrompt)
    .then((answer) => {
        const errors = validate(answer, 'empId', 'manager_id');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
        const params = [answer.manager_id, answer.empId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                updateEmpManager();
            }
            else {
                viewEmps();
            }
        });
    });
};

// view employees by manager
const viewEmpByManager = () => {
    inquirer.prompt(viewEmpByManagerPrompt)
    .then((answer) => {
        const errors = validate(answer, 'managerId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `SELECT first_name, last_name
        FROM employee
        WHERE manager_id = ?`;
        const params = [answer.managerId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                viewEmpByManager();
            }
            else {
                console.table(result);
                setTimeout(() => {
                    init();
                }, 1000);
            }
        });
    });
};

// view employees by department
const viewEmpByDept = () => {
    inquirer.prompt(viewEmpByDeptPrompt)
    .then((answer) => {
        const errors = validate(answer, 'departmentId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `SELECT employee.first_name, employee.last_name, department.name
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.id = ?`;
        const params = [answer.departmentId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                viewEmpByDept();
            }
            else {
                console.table(result);
                setTimeout(() => {
                    init();
                }, 1000);
            }
        });
    });
};

// delete department
const deleteDept = () => {
    inquirer.prompt(viewEmpByDeptPrompt)
    .then((answer) => {
        const errors = validate(answer, 'departmentId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `DELETE FROM department WHERE department.id = ?`;
        const params = [answer.departmentId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                deleteDept();
            }
            else {
                console.table(result);
                viewDepts();
            }
        });
    });
};

// delete role
const deleteRole = () => {
    inquirer.prompt(deleteRolePrompt)
    .then((answer) => {
        const errors = validate(answer, 'roleId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `DELETE FROM role WHERE role.id = ?`;
        const params = [answer.roleId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                deleteDept();
            }
            else {
                console.table(result);
                viewRoles();
            }
        });
    });
};

// delete employee
const deleteEmp = () => {
    inquirer.prompt(deleteEmpPrompt)
    .then((answer) => {
        const errors = validate(answer, 'empId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `DELETE FROM employee WHERE employee.id = ?`;
        const params = [answer.empId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                deleteDept();
            }
            else {
                console.table(result);
                viewEmps();
            }
        });
    });
};

// view utilized department budget
const utilizedBudget = () => {
    inquirer.prompt(UtilizedBudgetPrompt)
    .then((answer) => {
        const errors = validate(answer, 'departmentId');
        if (errors) {
            console.log(errors);
            return;
        }

        const sql = `SELECT department.id, department.name, SUM(role.salary) AS Salary
        FROM department
        INNER JOIN role ON department.id = role.department_id
        INNER JOIN employee ON role.id = employee.role_id
        WHERE department.id = ?
        GROUP BY department.name`;
        const params = [answer.departmentId];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log("There has been an error: " + err.code);
                console.log("Please try again");
                utilizedBudget();
            }
            else {
                console.table(result);
                setTimeout(() => {
                    init();
                }, 1000);
            }
        });
    })
};

// leave the application
const close = () => {
    console.log("Thanks for using the Employee Tracker! Goodbye!");
    db.end();
};

init();