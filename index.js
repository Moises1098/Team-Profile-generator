const inquirer = require('inquirer');
const Manager = require('./lib/Manager')
const fs = require('fs');
const Choices = require('inquirer/lib/objects/choices');
const Engineer = require('./lib/Engenieer');
const Intern = require('./lib/Intern');

// Use writeFileSync method to use promises instead of a callback function
const teamMembers = []

const promptManager = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the team manager?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the ID of the team manager',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the email address of the team manager?',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the office number of the team manager?',
    },



  ])
    .then((manager) => {
      const newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
      teamMembers.push(newManager)
      promptMenu()
    })
};

const promptEngineer = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the engineer?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the ID of the engineer?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the email address of the engineer?',
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the github of the engineer?',
    },

  ])
    .then((engineer) => {
      const newEngenieer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
      teamMembers.push(newEngenieer)
      promptMenu()
    })
}

const promptIntern = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the intern?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the ID of the intern?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the email address of the intern?',
    },
    {
      type: 'input',
      name: 'school',
      message: 'What is the school of the intern?',
    },
  ])
    .then((intern) => {
      const newIntern = new Intern(intern.name, intern.id, intern.email, intern.school)
      teamMembers.push(newIntern)
      promptMenu()
    })
}

const promptMenu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'what would you like to create next?',
      choices: ['intern', 'engineer', 'exit']

    }
  ])
    .then((menu) => {
      if (menu.menu === 'intern') {
        promptIntern()
      } else if (menu.menu === 'engineer') {
        promptEngineer()
      } else {
        //continue with creating html
        writer()
      }
    })
}



const generateHTML = (data) => {
  const teamHTMLGen = () => {
    const teamHTML = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].getRole() === 'Manager') {
        teamHTML.push(`<div class="card">
        <div style="background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(174,196,255,1) 66%, rgba(124,160,255,1) 100%);" class="content">
          <div class="header"><i class="user icon"></i> ${data[i].name}</div>
          <div class="meta"><i style="color: black" class="coffee icon"></i> Manager</div>
          <div class="ui fitted divider"></div>
          <div class="ui list">

            <div class="item">
              <i class="id badge icon"></i>
                <div class="content">
                ID: ${data[i].id}
                </div>
            </div>
        
            <div class="item">
              <i class="mail icon"></i>
              <div class="content"> Email: <a href="mailto:${data[i].email}">${data[i].email}</a></div>
            </div>

            <div class="item">
              <i class="building outline icon"></i>
              <div class="content"> 
              Office Number: ${data[i].officeNumber}
              </div>
            </div>

          </div>
        </div>
        </div>`)
      }
      if (data[i].getRole() === 'Engineer') {
        teamHTML.push(`

        <div class="card">
        <div style="background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(174,196,255,1) 66%, rgba(124,160,255,1) 100%);" class="content">
          <div class="header"><i class="user icon"></i> ${data[i].name}</div>
          <div class="meta"><i style="color: black" class="pencil alternate icon"></i> Engineer</div>
          <div class="ui fitted divider"></div>
          <div class="ui list">

            <div class="item">
              <i class="id badge icon"></i>
                <div class="content">
                ID: ${data[i].id}
                </div>
            </div>
        
            <div class="item">
              <i class="mail icon"></i>
              <div class="content"> Email: <a href="mailto:${data[i].email}">${data[i].email}</a></div>
            </div>

            <div class="item">
              <i class="building outline icon"></i>
              <div class="content"> 
              Office Number: ${data[i].officeNumber}
              </div>
            </div>

            <div class="item">
                <i class="github icon"></i>
                <div class="content">
                GitHub: ${data[i].github}
                </div>
            </div>
          </div>
        </div>
        </div>`)
      }
      if (data[i].getRole() === 'Intern') {
        teamHTML.push(`

        <div class="card">
        <div style="background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(174,196,255,1) 66%, rgba(124,160,255,1) 100%);" class="content">
          <div class="header"><i class="user icon"></i> ${data[i].name}</div>
          <div class="meta"><i style="color: black" class="graduation cap icon"></i> Intern</div>
          <div class="ui fitted divider"></div>
          <div class="ui list">

            <div class="item">
              <i class="id badge icon"></i>
                <div class="content">
                ID: ${data[i].id}
                </div>
            </div>
        
            <div class="item">
              <i class="mail icon"></i>
              <div class="content"> Email: <a href="mailto:${data[i].email}">${data[i].email}</a></div>
            </div>
            
          </div>
        </div>
        </div>`)
      }
    }
    return teamHTML.join('')
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha512-dqw6X88iGgZlTsONxZK9ePmJEFrmHwpuMrsUChjAw1mRUhUITE5QU9pkcSox+ynfLhL15Sv2al5A0LVyDCmtUw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>My Team</title>
</head>

<body>
<header> <div class="ui block aligned center header" style="background-color:red; font-size: xx-large; color: white;" >My Team</div> </header>
  <section style="padding: 1rem;">
  <div class="ui stackable cards">
    ${teamHTMLGen()}
  </div>
  </section>

</body>
</html>`};


const writer = () => {
  fs.writeFileSync('dist/index.html', generateHTML(teamMembers))

  // Use writeFileSync method to use promises instead of a callback function
  // .then((answers) => fs.writeFileSync('index.html', generateHTML(answers)))
  // .then(() => console.log('Successfully wrote to index.html'))
  // .catch((err) => console.error(err));
};


promptManager()
