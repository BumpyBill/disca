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
    log(good(`Installing dotenv`));

    exec(`npm i dotenv --save`, { cwd });

    log(good(`Installing ${answers.framework}`));

    exec(`npm i ${answers.framework.toLowerCase()} --save`, { cwd: cwd });

    log(good(`Creating start scripts`));

    fs.writeFileSync(
      `${join(cwd, "package.json")}`,
      JSON.stringify({
        scripts: {
          start: "node src/index.js",
        },
      })
    );

    log(good(`Adding env file`));

    fs.writeFileSync(join(cwd, ".env"), `BOT_TOKEN=${answers.token}`);

    log(good(`Creating index file`));

    fs.writeFileSync(
      join(cwd, `src/index.${answers.language === "JavaScript" ? "js" : "ts"}`),
      "D:<"
    );

    /*
    fs.readFileSync(
      `Templates/Base/${answers.framework}/${
        answers.language === "JavaScript" ? "js" : "ts"
      }.txt`,

      "utf8"
    );
    */

    log(good("Finished"));
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
