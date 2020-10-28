const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown.js")

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

inquirer
    .prompt(
        questions
    )
    .then(function(userData){
        console.log(userData)
        const queryUrl = `https://api.github.com/users/${userData.github}`;

        axios.get(queryUrl).then(function(results) {
            userData.avatar = results.data.avatar_url;
            userData.url = results.data.html_url;
            return userData;
        })
        .then(function(updatedData){
            console.log("new fx")
            //here is all the data you need for the readme
            console.log(updatedData)
            console.log(generateMarkdown(updatedData))
        });
    })

// function to write README file
function writeToFile(fileName, data) {

}

// function to initialize program
function init() {

}

// function call to initialize program
init();
