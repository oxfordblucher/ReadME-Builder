// function to generate markdown for README
function generateMarkdown(data, stats) {
  return `
# ${data.title}  ![License](<https://img.shields.io/badge/license-${data.license}-green>)

## Description
${data.description}

## Table of Contents
*[Installation](#Installation)  
*[Usage](#Usage)  
*[Contribution Guidelines](#Contribution&nbsp;Guidelines)  
*[Testing](#Testing)  
*[Questions](#Questions)  

## Installation
${data.install}

## Usage
${data.usage}

## Contribution Guidelines
${data.contrib}

## Testing
${data.test}

## Questions
1. What is your (the creator's) github?
${stats.name}
[${data.github}](${stats.html_url} "${data.github}")

2. How do I get in contact?
I am always available by email: ${data.email}
![avatar](${stats.avatar_url})

## License
${data.license}
`;
}

module.exports = generateMarkdown;
