const inquirer = require("inquirer");
const cTable = require("console.table");

// main menu prompts
const mainMenu = [
    {
        type: 'list',
        name: 'userAction',
        message: 'What would you like to do?',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role"
        ],
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    }
];

// initialize the inquirer prompts
const init = () => {
    inquirer.prompt(mainMenu)
    .then((answer) => {
        fetch('api/departments', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application-json'
            }
        });
    })
};

module.exports = {
    init
};