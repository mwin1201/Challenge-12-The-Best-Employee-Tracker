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
            "Update an employee role",
            "Leave"
        ],
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        },
        loop: false
    }
];

const deptPrompt = [
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Add department name:',
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

const rolePrompt = [
    {
        type: 'input',
        name: 'title',
        message: 'Add role title:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Add role salary:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'deptId',
        message: 'Add role department id:',
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

const empPrompt = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter employee first name:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter employee last name:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'Enter employee role id:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'manager_id',
        message: 'Enter employee manager id:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    }
]

const updateEmpPrompt = [
    {
        type: 'input',
        name: 'empId',
        message: 'Enter employee id to update:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'Enter employee role id:',
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        }
    }
]

const continuePrompt = [
    {
        type: 'list',
        name: 'checkContinue',
        message: 'Do you want to see the main menu?',
        choices: [
            'Yes',
            'No'
        ],
        validate: userInput => {
            if (userInput) {
                return true;
            }
            else {
                return false;
            }
        },
        loop: false
    }
]

module.exports = [
    mainMenu,
    deptPrompt,
    rolePrompt,
    empPrompt,
    updateEmpPrompt,
    continuePrompt
];