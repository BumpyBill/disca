#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const util_1 = __importDefault(require("util"));
const exec = util_1.default.promisify(require("child_process").exec);
var cwd = process.cwd();
var log = console.log;
const error = chalk_1.default.bold.red;
const warning = chalk_1.default.keyword("orange");
const good = chalk_1.default.greenBright;
const separate = chalk_1.default.gray(`#${"=".repeat(16)}#`);
log(chalk_1.default.red.bgYellow("\n \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588  \u2588\u2588\u2588   \n \u2588   \u2588   \u2588   \u2588     \u2588     \u2588   \u2588  \n \u2588   \u2588   \u2588   \u2588\u2588\u2588\u2588\u2588 \u2588     \u2588\u2588\u2588\u2588\u2588  \n \u2588   \u2588   \u2588       \u2588 \u2588     \u2588   \u2588  \n \u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588 \u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588 \u2588   \u2588  \n\n"));
log(warning(`You're about to initialize a Disca project in this directory:`));
log(chalk_1.default.bold(`  ${cwd}`));
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
    .then(async (answers) => {
    // Scripts
    log(good(`Creating Scripts`));
    var packageJSON = {
        main: answers.language == "JavaScript" ? "src/index.js" : "dist/index.js",
        scripts: {
            start: `node ${answers.language == "JavaScript" ? "src/index.js" : "dist/index.js"}`,
        },
    };
    if (answers.language == "TypeScript")
        packageJSON.scripts.build = "tsc -p .";
    await fs_1.default.writeFileSync(`${path_1.join(cwd, "package.json")}`, JSON.stringify(packageJSON));
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
        await fs_1.default.writeFileSync(path_1.join(cwd, "tsconfig.json"), JSON.stringify(require(path_1.join(__dirname, "../", `Templates/TypeScript/tsconfig.json`))));
    }
    log(separate);
    // .env
    log(good(`Adding ".env" File`));
    await fs_1.default.writeFileSync(path_1.join(cwd, ".env"), `BOT_TOKEN=${answers.token}`);
    // /src
    log(good(`Creating Source Folder`));
    await fs_1.default.mkdirSync(path_1.join(cwd, "src"));
    // index file
    log(good(`Creating Index File`));
    var indexCode = fs_1.default.readFileSync(path_1.join(__dirname, "../", `Templates/Discord.JS/BASE/BASE.${answers.language == "JavaScript" ? "js" : "ts"}.txt`), "utf8");
    if (answers.features.includes("Command Handler")) {
        indexCode +=
            "\r\n" +
                fs_1.default.readFileSync(path_1.join(__dirname, "../", `Templates/Discord.JS/BASE/Features/CommandHandler/CommandHandler.${answers.language == "JavaScript" ? "js" : "ts"}.txt`), "utf8");
    }
    indexCode += "\r\nclient.login(process.env.BOT_TOKEN);";
    await fs_1.default.writeFileSync(path_1.join(cwd, `src/index.${answers.language == "JavaScript" ? "js" : "ts"}`), indexCode);
    log(separate);
    log(good("Finished"));
    if (!/[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g.test(answers.token))
        log(warning("Invalid Token"));
})
    .catch((e) => {
    if (e)
        log(error(e));
});
