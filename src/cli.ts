#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";

// Title

var log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const good = chalk.greenBright;

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
  .then((answers: any) => {
    var cwd = process.cwd();

    if (answers.language == "JavaScript") {
      log(good(`Installing ${answers.framework}`));
      exec(`npm i ${answers.framework.toLowerCase()}`, { cwd: cwd });
    }
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
