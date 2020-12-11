const inquirer = require("inquirer");
const DB = require("./db/db.js");
require("console.table");

function questions() {
    inquirer.prompt({
        type: "list",
        name: "question",
        message: "What would you like to do?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Create department",
            "Create role",
            "Create employee",
            "Update employee role",
            "Exit"
        ]
    }).then(function (answer) {
        switch (answer.question) {
            case "View departments":
                deptSearch();
                break;

            case "View roles":
                roleSearch();
                break;

            case "View employees":
                employeeSearch();
                break;

            case "Create department":
                deptCreate();
                break;

            case "Create role":
                roleCreate();
                break;
                
            case "Create employee":
                employeeCreate();
                break;

            case "Update employee role":
                updateEmployeeRole();
                break;

            case "Exit":
                done();
                break;
        }
    });
}
function deptSearch() {
    console.log("Retreiving all departments...\n");
    DB.viewAllDepartments().then(function (res) {
        console.table(res);
        questions();
    });
}

function roleSearch() {
    console.log("Retreiving all roles...\n");
    DB.viewAllRoles().then(function (res) {
        console.table(res);
        questions();
    });
}

function employeeSearch() {
    console.log("Retreiving all employees...\n");
    DB.viewAllEmployees().then(function (res) {
        console.table(res);
        questions();
    });
}

function done() {
    process.exit()
}

function deptCreate() {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "Enter department name:"
        },
    ])
        .then(function (answer) {
            DB.createDepartment(answer.deptName).then(function (res) {
                console.log(res);
                deptSearch();
            });
        });
}

async function roleCreate() {
    const departments = await DB.viewAllDepartments();
    const departmentChoices = departments.map(({ department_id, name }) => ({
        name: name,
        value: department_id,
    }));
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title of this new role:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary for this new role:"
        },
        {
            type: "list",
            name: "department_id",
            message: "Enter the department to which this role will be assigned:",
            choices: departmentChoices
        },
    ]).then((answer) => {
        DB.createRole(answer.title, answer.salary, answer.department_id).then((res) => {
            console.log(res);
            roleSearch();
        });
    });
}

async function employeeCreate() {
    const roles = await DB.viewAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));
    const employees = await DB.viewAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
    }));

    employeeChoices.push({ name: "NA", value: null })

    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "Enter the employee's first name:",
            },
            {
                type: "input",
                name: "last_name",
                message: "Enter the employee's last name:",
            },
            {
                type: "list",
                name: "role_id",
                message: "Enter the employee's role:",
                choices: roleChoices,
            },
            {
                type: "list",
                name: "manager_id",
                message: "Enter the employee's manager, if applicable:",
                choices: employeeChoices,
            },
        ])
        .then((answer) => {
            DB.createEmployee(
                answer.first_name,
                answer.last_name,
                answer.role_id,
                answer.manager_id
            ).then((res) => {
                console.log(res);
                employeeSearch();
            });
        });
}

async function updateEmployeeRole() {
    const roles = await DB.viewAllRoles();
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));
    const employees = await DB.viewAllEmployees();
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
    }));

    inquirer
        .prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Enter the name of the employee you'd like to update:",
                choices: employeeChoices,
            },
            {
                type: "list",
                name: "role_id",
                message: "Enter the new role for this employee:",
                choices: roleChoices,
            },
        ])
        .then((answer) => {
            DB.updateEmployeeRole(answer.role_id, answer.employee_id).then((res) => {
                console.log(res);
                employeeSearch();
            });
        });
}


questions();
