#!/usr/bin/env node

import { argv } from "yargs";
import chalk from "chalk";

if (argv.init) {
  // Title

  var log = console.log;
  const error = chalk.bold.red;
  const warning = chalk.keyword("orange");

  log(
    chalk.red.bgYellow(
      "\n \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588   \n \u2588   \u2588   \u2588   \u2588     \u2588     \u2588   \u2588  \n \u2588   \u2588   \u2588   \u2588\u2588\u2588\u2588\u2588 \u2588     \u2588\u2588\u2588\u2588\u2588  \n \u2588   \u2588   \u2588       \u2588 \u2588     \u2588   \u2588  \n \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588 \u2588   \u2588  \n\n"
    )
  );
  log(warning(`You're about to initialize a Disca project in this directory:`));
  log(chalk.bold(`  ${__dirname}`));

  var inquirer = require("inquirer");
  inquirer
    .prompt([
      {
        type: "list",
        name: "language",
        message: "Language:",
        default: 0,
        choices: ["JavaScript", "TypeScript"],
      },
      {
        type: "list",
        name: "framework",
        message: "Framework:",
        default: 0,
        choices: ["Discord.JS", "Eris"],
      },
      {
        type: "checkbox",
        name: "features",
        message: "Features:",
        choices: ["Command Handler"],
      },
    ])
    .then((answers: object) => {
      console.log(answers);
    })
    .catch((e: Error) => {
      log(error(e));
    });
}
