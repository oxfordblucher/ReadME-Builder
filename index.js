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
        message: 'What is the name of your repo?',
        name: 'repo',
        default: 'ReadME-Builder',
        validate: function(ans) {
            if(ans.length > 1) {
                return true
            }else{
                return console.log('A valid repo name is required.')
            };
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
    .then(function(responseobj){
        console.log(responseobj)
        const queryUrl = `https://api.github.com/users/${responseobj.github}/repos?per_page=100`;

        axios.get(queryUrl).then(function(res) {
            /* console.log(res.data[0]); */
            console.log(res.data[0].owner.avatar_url)
            responseobj.githubicon=res.data[0].owner.avatar_url;
            console.log(responseobj);
               return responseobj;
        })
        .then(function(updatedresponseobj){
            console.log("new fx")
            //here is all the data you need for the readme
            console.log(updatedresponseobj)
            console.log(generateMarkdown(updatedresponseobj))
        });
    })
   

// array of questions for user


// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
