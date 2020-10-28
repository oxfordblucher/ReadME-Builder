const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js")

const writeFileAsync = util.promisify(fs.writeFile)

const questions = [
    {
        type: 'input',
        message: 'What is your github username?',
        name: 'github',
        default: 'oxfordblucher',
        validate: function(ans) {
            if(ans.length > 1) {
                return true
            }else{
                return console.log('A valid username is required.')
            };
        }
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email',
        default: 'hiuchanhk@gmail.com',
        validate: async (ans) => {
            let email = await ans;
            if(email.indexOf('@') !== -1) {
                return true;
            }else{
                return console.log('A valid email is required.')
            }
        }
    },
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
        default: 'README Builder'
    },
    {
        type: 'input',
        message: 'What is your project description?',
        name: 'description',
        default: 'Every project needs a README and this node.js app will make the work simple for you! Upon execution, the app prompts the user to answer several questions for which the answers will serve as different sections of a newly created README file.'
    },
    {
        type: 'input',
        message: 'If applicable, how would one go about installing your software?',
        name: 'install',
        default: 'This application requires the "inquirer" and "axios" NPMs, both of which can be installed by running "npm install" in the terminal.'
    },
    {
        type: 'input',
        message: 'Instructions for using your code?',
        name: 'usage',
        default: 'Input the information asked of you by the application and out comes a README file with all the appropriate formatting and style.'
    },
    {
        type: 'input',
        message: 'If applicable, what are your contribution guidelines?',
        name: 'contrib',
    },
    {
        type: 'input',
        message: 'If applicable, what are tests for your software and how does one run them?',
        name: 'test',
    },
    {
        type: 'list',
        message: 'Choose a project license',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license',
    },
];

function promptUser() {
    return inquirer
        .prompt(
            questions
        )
}

const api = {
    async getUser(data) {
    try { 
        let response = await axios
        .get(`https://api.github.com/users/${data.github}`);
        return response.data;
        } catch (err) {
            console.log(err);
        }
    }
};

// function to initialize program
async function init() {
    try {
        const data = await promptUser();
        const stats = await api.getUser(data);
        console.log(stats);
        console.log(data);
  
        const markdown = generateMarkdown(data, stats);
  
        await writeFileAsync(`${data.title} README.md`, markdown);
  
        console.log("Successfully created a new README!");
    } catch(err) {
        console.log(err);
    }
}

// function call to initialize program
init();