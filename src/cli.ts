#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import { join } from "path";

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

    log(good(`Installing Discord.JS`));

    await exec(`npm i discord.js --save`, { cwd });

    log(good(`Creating start scripts`));

    await fs.writeFileSync(
      `${join(cwd, "package.json")}`,
      JSON.stringify({
        main: `src/index.js`,
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
      join(__dirname, "../", `Templates/Discord.JS/BASE/BASE.js.txt`),
      "utf8"
    );

    await fs.writeFileSync(join(cwd, `src/index.js`), indexCode);

    log(good("Finished"));

    if (!/[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/.test(answers.token))
      log(warning("Invalid Token"));
  })
  .catch((e: Error) => {
    if (e) log(error(e));
  });
