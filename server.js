//const express = require("express");
const db = require("./db/connection");
//const apiRoutes = require("./routes/apiRoutes");
//const PORT = process.env.PORT || 3001;
//const app = express();
const cTable = require("console.table");
const [ mainMenu, deptPrompt, rolePrompt, empPrompt, updateEmpPrompt, continuePrompt ] = require('./lib/index');
const inquirer = require("inquirer");
const validate = require('./utils/validate');


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
            default:
                close();
        }
    });
};


const viewDepts = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("ALL DEPARTMENTS")
        console.table(results);
    });
    continueCheck();
};

const viewRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("All ROLES");
        console.table(results);
    });
    //init();
};

const viewEmps = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("All EMPLOYEES");
        console.table(results);
    });
    //init();
};

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
            if (err) throw err;
            viewDepts();
        });
    });
    //init();
};

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
                init();
            }
        });
    });
    //init();
};

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
                init();
            }
        });
    });
    //init();
};

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
                init();
            }
        });
    });
};

const close = () => {
    console.log("Thanks for using the Employee Tracker! Goodbye!");
    db.end();
};

const continueCheck = () => {
    inquirer.prompt(continuePrompt)
    .then((answer) => {
        if (answer.checkContinue === 'Yes') {
            init();
        }
        else {
            close();
        }
    });
};

init();