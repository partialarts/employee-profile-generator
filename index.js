// Employee types
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Required modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employees = [];

// Add a manager
const managerQuestions = () => {
    console.log(`Add a manager to the team`);
    return inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the team manager's name?",
                validate(input) {
                    if (input) {
                        return true;
                    } else {
                        console.log("\n Please enter the manager's name");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "id",
                message: "What is the manager's ID?",
                validate(input) {
                    if (isNaN(input)) {
                        console.log("\n Please enter a valid number");
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                type: "input",
                name: "email",
                message: "What is the manager's email?",
                validate(input) {
                    const emailPass = input.toLowerCase()
                    if (emailPass.includes("@") === true) {
                        return true;
                    } else {
                        console.log("\n Please enter a valid email address");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "officeNum",
                message: "What is the manager's office number?",
                validate(input) {
                    if (isNaN(input)) {
                        console.log("\n Please enter a valid number");
                        return false;
                    } else {
                        return true;
                    }
                },
            },
        ])

        .then((man) => {
            const manager = new Manager(man.name, man.id, man.email, man.officeNum);
            employees.push(manager);
            console.log(manager);
            employeeQuestions();
        });

};

const employeeQuestions = () => {
    console.log(`Add an employee to the team`);
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: ["Engineer", "Intern", "Finish building the team"],
        },
    ])
        .then((emp) => {
            if (emp.role === "Engineer") {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the engineer's name?",
                        validate(input) {
                            if (input) {
                                return true;
                            } else {
                                console.log("\n Please enter the engineer's name");
                                return false;
                            }
                        }
                    },
                    {
                        type: "number",
                        name: "id",
                        message: "What is the engineer's ID number?",
                        validate(input) {
                            if (isNaN(input)) {
                                console.log("\n Please enter a valid number");
                                return false;
                            } else {
                                return true;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is the engineer's email address?",
                        validate(input) {
                            const emailPass = input.toLowerCase()
                            if (emailPass.includes("@") === true) {
                                return true;
                            } else {
                                console.log("\n Please enter a valid email address");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is the engineer's GitHub username?",
                        validate(input) {
                            if (input) {
                                return true;
                            } else {
                                console.log("\n Please enter the engineer's GitHub username");
                                return false;
                            }
                        }
                    },
                ])
                    .then((eng) => {
                        const engineer = new Engineer(eng.name, eng.id, eng.email, eng.github);
                        employees.push(engineer);
                        employeeQuestions();
                    });
            } else if (emp.role === "Intern") {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the intern's name?",
                        validate(input) {
                            if (input) {
                                return true;
                            } else {
                                console.log("\n Please enter the intern's name");
                                return false;
                            }
                        },
                    },
                    {
                        type: "number",
                        name: "id",
                        message: "What is the intern's ID number?",
                        validate(input) {
                            if (isNaN(input)) {
                                console.log("\n Please enter a valid number");
                                return false;
                            } else {
                                return true;
                            }
                        },
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is the intern's email address?",
                        validate(input) {
                            const emailPass = input.toLowerCase()
                            if (emailPass.includes("@") === true) {
                                return true;
                            } else {
                                console.log("\n Please enter a valid email address");
                                return false;
                            }
                        }
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "What is the intern's school?",
                        validate(input) {
                            if (input) {
                                return true;
                            } else {
                                console.log("\n Please enter the intern's school");
                                return false;
                            }
                        }
                    },
                ])
                    .then((int) => {
                        const intern = new Intern(int.name, int.id, int.email, int.school);
                        employees.push(intern);
                        employeeQuestions();
                    });
            } else {
                // When user selects "Done", run generateHTML function
                generateHTML(employees);
            }
        });
}

const generateHTML = (content) => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(content), 'utf-8');
    console.log(`Team profile generated: ${outputPath}`);
};

// Starts the application
managerQuestions()