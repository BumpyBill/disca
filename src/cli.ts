#!/usr/bin/env node

import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs";
import { join } from "path";

var cwd = process.cwd();

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
log(chalk.bold(`  ${cwd}`));

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
    {
      type: "password",
      name: "token",
      message: "Token:",
    },
  ])
  .then(async (answers: any) => {
    if (answers.language == "JavaScript") {
      fs.writeFileSync(
        `${join(cwd, "package.json")}`,
        JSON.stringify({
          scripts: {
            start: "node src/index.js",
          },
        })
      );
      fs.writeFileSync(
        join(cwd, "config.json"),
        JSON.stringify({
          token: answers.token,
        })
      );

      log(good(`Installing ${answers.framework}`));
      exec(
        `npm i ${answers.framework.toLowerCase()} --save`,
        { cwd: cwd },
        () => {
          log(good(`Installed ${answers.framework}`));
        }
      );

      var indexCode = [
        "const Discord = require('discord.js')",
        "",
        "var config = require('./config.json')",
        "const client = new Discord.Client()",
        "",
        "client.login(config.token)",
      ];

      fs.mkdirSync(join(cwd, "src"));
      fs.writeFileSync(`${join(cwd, "src/index.js")}`, indexCode.join(`\r\n`));

      log(good("Finished"));
    }
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });