[![Generic badge](https://img.shields.io/badge/license-MIT-<COLOR>.svg)](#license)
![GitHub language count](https://img.shields.io/github/languages/count/cdfishe1/team-generator)
![GitHub top language](https://img.shields.io/github/languages/top/cdfishe1/team-generator)

# Employee Tracker App

This node.js app allows a user to read, create, and update employee information in a database.

## Table of Contents
* [Employee Tracker](#employee-tracker)
* [YouTube Demonstration](#youtube-demonstration)
* [Scope of Project](#scope-of-project)
* [Installation](#installation)
* [Code Snippet](#code-snippet)
* [Project Review](#project-review)
* [Credits](#credits)
* [License](#license)

## Team Generator

## YouTube Demonstration
[YouTube Video Demonstration](https://youtu.be/Vdktoi1BHUE)


## Scope of Project

* Uses npm mysql to make calls to a locally hosted database.
* Uses validation functions with inquirer and regular expressions to validate manually entered user input.
* Adds a splash header when the app initializes.

## Installation

* This app requires the following npm packages:
   * [inquirer](https://www.npmjs.com/package/inquirer)
   * [mysql](https://www.npmjs.com/package/mysql)
   * [console-table-printer](https://www.npmjs.com/package/console-table-printer)
   * [figlet](https://www.npmjs.com/package/figlet)
   * [chalk](https://www.npmjs.com/package/chalk)

* Upon cloning open node.js and enter npm i in order to install all the dependenicies.
* After installation you begin the app with npm start.

## Code Snippet
I modified the following code from [Codota](https://www.codota.com/code/javascript/functions/figlet/textSync) in order to execute the graphic spash heading:

```
const welcomeLogo = (welcomeString) => {
 clear();
 console.log(chalk.red(figlet.textSync('\nthe Forge', { font: 'ANSI Shadow', horizontalLayout: 'full' })));
 console.log(`Welcome to the Forge! ${welcomeString} 🔥 🔥 🔥\n`);
}
```

## Project Review
* The most difficult part of this project was translating mysql queries into node versions of these queries that the mysql database could understand. The documentation for implementing node versions of mysql queries is much less robust than running mysql on a platform like mysql workbench. The code for this project is really long and repetitious, but I couldn't figure out how to parse the query functions into the main mysql functions that implemented the required functionality without a lot of auxillary functions feeding into these main functions.
* Related to the "spaghetti" nature of this code is the sometimes ugly prompts for user data, especially when adding an employee. I needed to gather various primary and foreign keys to execute the queries properly, but I had difficulty knowing how to not show this information in the inquirer mechanism.
* For future updates I would plan on modulizing these functions such that the code is cleaner and easier to understand.
* There is an intermittant error thrown when exiting the program that is due, I believe, to an open query.connection somewhere while exiting the program. I haven't been able to identify how to close this.

## Credits
[Codota](https://www.codota.com/code/javascript/functions/figlet/textSync)


## License

Copyright (c) Charles Fisher All rights reserved.<br>
Please be kind and change content if you wish to use this code.

<details><summary>Licensed under the MIT License</summary>

Copyright (c) 2021 - present | Charles Fisher

<blockquote>
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</blockquote>
</details>


