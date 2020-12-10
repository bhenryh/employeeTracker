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
            "Create roles",
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

questions();
