#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import { join } from "path";
import packageJSON from "./interfaces/packageJSON";

import util from "util";
const exec = util.promisify(require("child_process").exec);

var cwd = process.cwd();

var log = console.log;
const error = chalk.bold.red;
const warning = chalk.keyword("orange");
const good = chalk.greenBright;
const separate = chalk.gray(`#${"=".repeat(16)}#`);

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
      choices: ["JavaScript", "TypeScript"],
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
    // Scripts
    log(good(`Creating Scripts`));
    var packageJSON: packageJSON = {
      main: answers.language == "JavaScript" ? "src/index.js" : "dist/index.js",
      scripts: {
        start: `node ${
          answers.language == "JavaScript" ? "src/index.js" : "dist/index.js"
        }`,
      },
    };
    if (answers.language == "TypeScript")
      packageJSON.scripts.build = "tsc -p .";
    await fs.writeFileSync(
      `${join(cwd, "package.json")}`,
      JSON.stringify(packageJSON)
    );

    log(separate);

    // Dotenv
    log(good(`Installing Dotenv`));
    await exec(`npm i dotenv --save`, { cwd });

    // Disca
    log(good(`Installing Disca`));
    await exec(`npm i disca --save`, { cwd });

    // Framework
    log(good(`Installing Discord.JS`));
    await exec(`npm i discord.js --save`, { cwd });

    log(separate);

    log(good("Installing @types/node"));
    await exec(`npm i @types/node --save-dev`, { cwd });

    if (answers.language == "TypeScript") {
      log(separate);
      log(good("Initializing TypeScript"));

      await fs.writeFileSync(
        join(cwd, "tsconfig.json"),
        JSON.stringify(
          require(join(__dirname, "../", `Templates/TypeScript/tsconfig.json`))
        )
      );
    }

    log(separate);

    // .env
    log(good(`Adding ".env" File`));
    await fs.writeFileSync(join(cwd, ".env"), `BOT_TOKEN=${answers.token}`);

    // /src
    log(good(`Creating Source Folder`));
    await fs.mkdirSync(join(cwd, "src"));

    // index file
    log(good(`Creating Index File`));
    var indexCode = fs.readFileSync(
      join(
        __dirname,
        "../",
        `Templates/Discord.JS/BASE/BASE.${
          answers.language == "JavaScript" ? "js" : "ts"
        }.txt`
      ),
      "utf8"
    );

    if (answers.features.includes("Command Handler")) {
      indexCode +=
        "\r\n" +
        fs.readFileSync(
          join(
            __dirname,
            "../",
            `Templates/Discord.JS/BASE/Features/CommandHandler/CommandHandler.${
              answers.language == "JavaScript" ? "js" : "ts"
            }.txt`
          ),
          "utf8"
        );
    }

    indexCode += "\r\nclient.login(process.env.BOT_TOKEN);";

    await fs.writeFileSync(
      join(cwd, `src/index.${answers.language == "JavaScript" ? "js" : "ts"}`),
      indexCode
    );

    log(separate);

    log(good("Finished"));

    if (!/[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g.test(answers.token))
      log(warning("Invalid Token"));
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
