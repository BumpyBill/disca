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
      choices: ["JS", "TS"],
    },
    {
      type: "password",
      name: "token",
      message: "Token:",
    },
  ])
  .then(async (answers: any) => {
    log(good(`Creating Scripts`));

    var packageJSON: packageJSON = {
      main: answers.language == "JS" ? "src/index.js" : "dist/index.js",
      scripts: {
        start: `node ${
          answers.language == "JS" ? "src/index.js" : "dist/index.js"
        }`,
      },
    };

    if (answers.language == "TS") packageJSON.scripts.build = "tsc -p .";

    await fs.writeFileSync(
      `${join(cwd, "package.json")}`,
      JSON.stringify(packageJSON)
    );

    log(good(`Installing Dotenv`));

    await exec(`npm i dotenv --save`, { cwd });

    log(good(`Installing Disca`));

    await exec(`npm i disca --save`, { cwd });

    log(good(`Installing Discord.JS`));

    await exec(`npm i discord.js --save`, { cwd });

    if (answers.language == "TS") {
      log(good("Initializing TypeScript"));

      await fs.writeFileSync(
        join(cwd, "tsconfig.json"),
        JSON.stringify(
          fs.readFileSync(
            join(__dirname, "../", `Templates/TypeScript/tsconfig.json`),
            "utf8"
          )
        )
      );
    }

    log(good(`Adding ".env" File`));

    await fs.writeFileSync(join(cwd, ".env"), `BOT_TOKEN=${answers.token}`);

    log(good(`Creating Source Folder`));

    await fs.mkdirSync(join(cwd, "src"));

    log(good(`Creating Index File`));

    var indexCode = fs.readFileSync(
      join(
        __dirname,
        "../",
        `Templates/Discord.JS/BASE/BASE.${
          answers.language == "JS" ? "js" : "ts"
        }.txt`
      ),
      "utf8"
    );

    await fs.writeFileSync(
      join(cwd, `src/index.${answers.language == "JS" ? "js" : "ts"}`),
      indexCode
    );

    log(good("Finished"));

    if (!/[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/.test(answers.token))
      log(warning("Invalid Token"));
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
