#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import { existsSync } from "fs";
import fs from "fs";
import path from "path";
import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
import { confirm } from "@inquirer/prompts";
import ora from "ora";
import { displayProjectConfig } from "./utils/display-config.js";
import { generateFiles } from "./utils/generate.js";
import { welcomeMessage } from "./utils/messages.js";
welcomeMessage();
function getProjectConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get project name
        let projectName;
        let projectPath;
        while (true) {
            projectName = yield input({
                message: "What is the name of your project?",
                default: "my-project",
            });
            projectPath = path.join(process.cwd(), projectName);
            if (!existsSync(projectPath)) {
                break;
            }
            const shouldDelete = yield confirm({
                message: "A folder with this name already exists. Do you want to delete it?",
                default: false,
            });
            if (shouldDelete) {
                try {
                    yield fs.promises.rm(projectPath, { recursive: true, force: true });
                    break;
                }
                catch (error) {
                    console.log(chalk.red(`Failed to delete the folder: ${error.message}`));
                    continue;
                }
            }
            console.log(chalk.yellow("Please choose a different name."));
        }
        const projectType = yield select({
            message: "What type of project do you want to create?",
            choices: ["nextjs", "npm-package", "docs"],
        });
        // Skip additional prompts for npm-package
        let includeDB = false;
        let includeBetterAuth = false;
        let includeLemonsqueezy = false;
        let includeResend = false;
        if (projectType !== "npm-package") {
            // Get DB preference
            includeDB = yield confirm({
                message: "Do you want to include DB (Drizzle ORM & Neon) for your project?",
                default: true,
            });
            // Get BetterAuth if DB is selected
            includeBetterAuth = includeDB
                ? yield confirm({
                    message: "Do you want to include BetterAuth for authentication?",
                    default: true,
                })
                : false;
            // Get other preferences
            includeLemonsqueezy = yield confirm({
                message: "Do you want to integrate Lemonsqueezy for payments?",
                default: false,
            });
            includeResend = yield confirm({
                message: "Do you want to set up Resend for email sending?",
                default: false,
            });
        }
        const answers = {
            projectName,
            projectType,
            DB: includeDB,
            "better-auth": includeBetterAuth,
            lemonsqueezy: includeLemonsqueezy,
            resend: includeResend,
        };
        return answers;
    });
}
// Main execution
getProjectConfig()
    .then((answers) => __awaiter(void 0, void 0, void 0, function* () {
    displayProjectConfig(answers);
    const projectType = answers.projectType;
    const isDB = answers.DB;
    const isBetterAuth = answers["better-auth"];
    const isLemonsqueezy = answers.lemonsqueezy;
    const isResend = answers.resend;
    if (projectType === "npm-package") {
        const spinner = ora("Generating npm-package files...\n").start();
        yield generateFiles(answers.projectName, "npm-package");
        spinner.stop();
        console.log("✨ npm-package setup completed successfully!");
    }
    else if (isDB && !isBetterAuth && !isLemonsqueezy && !isResend) {
        const spinner = ora("Generating DB files...\n").start();
        yield generateFiles(answers.projectName, "db");
        spinner.stop();
        console.log("✨ DB setup completed successfully!");
    }
    else if (isBetterAuth && isDB && !isLemonsqueezy && !isResend) {
        const spinner = ora("Generating BetterAuth files...\n").start();
        yield generateFiles(answers.projectName, "better-auth");
        spinner.stop();
        console.log("✨ Better Auth setup completed successfully!");
        console.log("🔑 Don't forget to set your BETTER_AUTH_SECRET in the .env file");
    }
}))
    .catch((error) => {
    if (error.isTtyError) {
        console.log(chalk.yellow("\nPrompt couldn't be rendered in the current environment."));
    }
    else {
        console.log(chalk.red("\nAn error occurred:"));
        console.log(chalk.red(error.message || error));
        console.log(chalk.yellow("\nProcess cancelled. Have a great day! 👋"));
    }
    process.exit(1);
});
