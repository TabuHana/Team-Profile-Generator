const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")
const fse = require('fs-extra')

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer")


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

let employeeSystem = []

const addMoreMembers = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'moreMemebers',
      message: 'Would you like to add more team members?',
      choices: ['Yes', 'No']
    }
  ])
  .then(answer => {
    if (answer.moreMemebers === 'Yes'){
      newEmployee()
    } else if (answer.moreMemebers === 'No') {
      console.log(employeeSystem)
    }
  })
}

const newEmployee = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'employeeRole',
    message: 'Please select an employee type: ',
    choices: ['Engineer', 'Intern']
  }])
    .then(response => {
      if (response.employeeRole === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'engineerName',
            message: 'What is the engineer\'s name?'
          },
          {
            type: 'input',
            name: 'engineerID',
            message: 'What is the engineer\'s ID?'
          },
          {
            type: 'input',
            name: 'engineerEmail',
            message: 'What is the engineer\'s email?'
          },
          {
            type: 'input',
            name: 'engineerGithub',
            message: 'What is the engineer\'s github?'
          }
        ])
          .then(engineer => {
            let newEngineer = new Engineer(engineer.engineerName, engineer.engineerID, engineer.engineerEmail, engineer.engineerGithub)
            employeeSystem.push(newEngineer)
            addMoreMembers()
          })
      } else if (response.employeeRole === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'internName',
            message: 'What is the intern\'s name?'
          },
          {
            type: 'input',
            name: 'internID',
            message: 'What is the intern\'s ID?'
          },
          {
            type: 'input',
            name: 'internEmail',
            message: 'What is the intern\'s email?'
          },
          {
            type: 'input',
            name: 'internSchool',
            message: 'What is the intern\'s school?'
          }
        ])
          .then(intern => {
            let newIntern = new Intern(intern.internName, intern.internID, intern.internEmail, intern.internSchool)
            employeeSystem.push(newIntern)
            addMoreMembers()
          })
      } 
    })
}

inquirer.prompt([
  {
    type: 'input',
    name: 'managerName',
    message: 'What is the team manager\'s name?'
  },
  {
    type: 'input',
    name: 'managerID',
    message: 'What is the team manager\'s ID?'
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: 'What is the team manager\'s email?'
  },
  {
    type: 'input',
    name: 'managerOfficeNumber',
    message: 'What is the team manager\'s office number?'
  }
])
  .then(manager => {
    let newManager = new Manager(manager.managerName, manager.managerID, manager.managerEmail, manager.managerOfficeNumber)
    employeeSystem.push(newManager)
    console.log(employeeSystem)
    newEmployee()
  })

