const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection
    }

    viewAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }

    viewAllRoles() {
        return this.connection.query("SELECT role.id, role.title, role.salary, role.department_id, department.name  FROM role LEFT JOIN department on department_id = department.id")
    }

    viewAllEmployees() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id")
    }

    createDepartment(name) {
        return this.connection.query("INSERT INTO department SET ?", {
            name: name
        })
    }

    createRole(title, salary, department_id) {
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }

    createEmployee(first_name, last_name, role_id, manager_id) {
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        })
    }

    updateEmployeeRole(role_id, employee_id) {
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{
            role_id: role_id
        },
        {
            id: employee_id
        }])
    }

}

module.exports = new DB(connection)