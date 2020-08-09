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

//ask the user about the team
//additional questions prompt if member is manager, intern or engineer
//information is put into a new object
//those objects are stored in the array
function createTeam() {
    var teamMember = {};
    inquirer.prompt([
        {
            type: "input",
            message: "How many people are on the team?",
            name: "staffSize",
        },
    ]) 
    .then (function (response) {
        for(var i=1;i<response.staffSize;i++){
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
          
        ]) .then(function (response) {
            if (response.role === "Manager") {
                teamMember = new Manager(response.name, response.id, response.email, response.officeNumber);
                
            } else if (response.role === "Engineer") {
                teamMember = new Engineer(response.name, response.id, response.email, response.github);
                
            } else {
                teamMember = new Intern(response.name, response.id, response.email, response.school);
            }
        
            team.push(teamMember);
        
            console.log(teamMember)
            console.log("-----------------")
            console.log(team)
            
    });
 
    }});
   //ask how many people are on the team, then run the function that many times with an adjustable loop

};

createTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
