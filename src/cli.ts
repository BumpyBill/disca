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
      choices: ["Discord.JS"],
    },
    {
      type: "checkbox",
      name: "features",
      message: "Features:",
      default: 0,
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

    await exec(`npm i dotenv --save`, { cwd });

    log(good(`Installing disca`));

    await exec(`npm i disca --save`, { cwd });

    log(good(`Installing ${answers.framework}`));

    await exec(`npm i ${answers.framework.toLowerCase()} --save`, { cwd });

    log(good(`Creating start scripts`));

    await fs.writeFileSync(
      `${join(cwd, "package.json")}`,
      JSON.stringify({
        scripts: {
          start: "node src/index.js",
        },
      })
    );

    log(good(`Adding env file`));

    await fs.writeFileSync(join(cwd, ".env"), `BOT_TOKEN=${answers.token}`);

    log(good(`Creating source folder`));

    await fs.mkdirSync(join(cwd, "src"));

    log(good(`Creating index file`));

    var indexCode = fs.readFileSync(
      join(
        __dirname,
        "../",
        `Templates/${answers.framework}/BASE/BASE.${
          answers.language === "JavaScript" ? "js" : "ts"
        }.txt`
      ),
      "utf8"
    );

    log(good(`Starting creation of extra features`));

    if (answers.features.includes("Command Handler")) {
      log(good(`Creating command handler`));
      indexCode +=
        "\r\n" +
        fs.readFileSync(
          join(
            __dirname,
            "../",
            `Templates/${answers.framework}/BASE/Features/CommandHandler.${
              answers.language === "JavaScript" ? "js" : "ts"
            }.txt`
          ),
          "utf8"
        );
    }

    await fs.writeFileSync(
      join(cwd, `src/index.${answers.language === "JavaScript" ? "js" : "ts"}`),
      indexCode
    );

    log(good("Finished"));
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
