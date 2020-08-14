const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Define an array for the team members and store them
const team = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//information is put into a new object
//those objects are stored in the array
//ask about each team member
function createTeam(){
inquirer.prompt([
    {
        type: "input",
        message: "Please enter employee name:",
        name: "name",
    },
    {
        type: "list",
        message: "Choose Employee Role:",
        choices: ["Intern", "Engineer", "Manager"],
        name: "role"
    },
    {
        type: "input",
        message: "Employee ID:",
        name: "id",
    },
    {
        type: "input",
        message: "E-Mail Address:",
        name: "email",
    },
    {
        type: "input",
        message: "Github Username:",
        name: "github",
    },
    {
        type: "input",
        message: "Office Number:",
        name: "officeNumber",
    },
    {
        type: "input",
        message: "School:",
        name: "school",
    },
    {
        type: "confirm",
        message: "Add another Employee?",
        name: "another",
    },

]).then(function (response) {
    var teamMember = {};
    //create objects based on employee role
    if (response.role === "Manager") {
        teamMember = new Manager(response.name, response.id, response.email, response.officeNumber);

    }
    else if (response.role === "Engineer") {
        teamMember = new Engineer(response.name, response.id, response.email, response.github);

    }
    else {
        teamMember = new Intern(response.name, response.id, response.email, response.school);
    }
    //push the team member object to the array
    team.push(teamMember);
    //repeat the function if user needs another team member
    if (response.another) {
        createTeam();
    }
    //output to the team directory
    else {
        fs.writeFile('./output/team.html', render(team), (err) => {
            if (err) return console.log(err);
            console.log("success");
        });
    }
});
}

// call the function
createTeam();
