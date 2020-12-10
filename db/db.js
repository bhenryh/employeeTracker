const connection = require("./connection");

class DB {
    constructor(){
        this.connection = connection
    }

    viewAllDepartments(){
        return this.connection.query("SELECT * FROM department")
    }

    viewAllRoles(){
        return this.connection.query("SELECT * FROM role")
    }

    viewAllEmployees(){
        return this.connection.query("SELECT * FROM employee")
    }

    createDepartment(name){
        return this.connection.query("INSERT INTO department SET ?", {
            name: name
        })
    }

    createRole(title, salary, department_id){
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }

}

module.exports = new DB(connection)