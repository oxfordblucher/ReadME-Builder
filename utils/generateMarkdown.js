// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.title}

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
[${data.github}]('${data.url}')

2. How do I get in contact?
I am always available by email: ${data.email}
`;
}

module.exports = generateMarkdown;
