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
            "Update employee manager",
            "View employees by manager",
            "View employees by department",
            "Delete department",
            "Delete role",
            "Delete employee",
            "View utilized budget for department",
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

const updateEmpManagerPrompt = [
    {
        type: 'input',
        name: 'empId',
        message: 'Enter the employee id to update:',
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
        message: 'Enter the new manager id:',
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

const viewEmpByManagerPrompt = [
    {
        type: 'input',
        name: 'managerId',
        message: 'Enter manager id:',
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

const viewEmpByDeptPrompt = [
    {
        type: 'input',
        name: 'departmentId',
        message: 'Enter department id:',
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

const deleteRolePrompt = [
    {
        type: 'input',
        name: 'roleId',
        message: 'Enter role id:',
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

const deleteEmpPrompt = [
    {
        type: 'input',
        name: 'empId',
        message: 'Enter the employee id:',
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

const UtilizedBudgetPrompt = [
    {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department id:',
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

module.exports = [
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
];