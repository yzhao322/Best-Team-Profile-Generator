const inquirer = require("inquirer");
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const render = require("./lib/htmlRenderer");

function info() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter name: ",
            name: "Name"
        },
        {
            type: "input",
            message: "Enter Email Address: ",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Employee ID: ",
            name: "id"
        },
        {
            type: "list",
            message: "Enter Position: ",
            name: "position",
            choices: ["manager", "engineer", "intern"]
        },
    ]).then(function (name) {
        let emp = new Employee();
        emp.name = name.Name;
        emp.id = name.id;
        emp.email = name.email;
        let position = name.position;
        if (position.toUpperCase() === "MANAGER") {
            inquirer.prompt({
                message: "Enter office number: ",
                name: "officenumber"
            }).then(function (name) {
                let manager = new Manager(emp.name, emp.id, emp.email);
                manager.officeNumber = name.officenumber;
                render(manager);
                inquirer.prompt({
                    type:"list",
                    message: "Continue input?",
                    name: "continue",
                    choices: ["Yes","No"]
                }).then(function (name) {
                    if (name.continue === "Yes") {
                        info();
                    }
                    return;
                })
            });
        }
        else if (position.toUpperCase() === "ENGINEER") {
            inquirer.prompt({
                message: "Enter Github Name: ",
                name: "github"
            }).then(function (name) {
                let engineer = new Engineer(emp.name, emp.id, emp.email);
                engineer.github = name.github;
                render(engineer);
                inquirer.prompt({
                    type:"list",
                    message: "Continue input?",
                    name: "continue",
                    choices: ["Yes","No"]
                }).then(function (name) {
                    if (name.continue === "Yes") {
                        info(); 
                    }
                    return;
                })
            });
        }
        else if (position.toUpperCase() === "INTERN") {
            inquirer.prompt({
                message: "Enter School Name: ",
                name: "school"
            }).then(function (name) {
                let intern = new Intern(emp.name, emp.id, emp.email);
                intern.school = name.school;
                render(intern);
                inquirer.prompt({
                    type:"list",
                    message: "Continue input?",
                    name: "continue",
                    choices: ["Yes","No"]
                }).then(function (name) {
                    if (name.continue === "Yes") {
                        info(); 
                    }
                    return;
                })
            });
        }
    });
}
info();
