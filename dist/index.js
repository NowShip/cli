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
import path from "path";
import { input } from "@inquirer/prompts";
import { confirm } from "@inquirer/prompts";
import { displayProjectConfig } from "./utils/display-config.js";
import { generateBetterAuthFiles } from "./utils/generate-files/better-auth.js";
import ora from "ora";
console.log(chalk.blue("\nWelcome to My Custom CLI!\n"));
function getProjectConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get project name
        const projectName = yield input({
            message: "What is the name of your project?",
            default: "my-project",
            validate: (value) => {
                const projectPath = path.join(process.cwd(), value);
                if (existsSync(projectPath)) {
                    return chalk.red("A folder with this name already exists. Please choose a different name.");
                }
                return true;
            },
        });
        // Get DB preference
        const includeDB = yield confirm({
            message: "Do you want to include DB (Drizzle ORM & Neon) for your project?",
            default: true,
        });
        // Get BetterAuth if DB is selected
        const includeBetterAuth = includeDB
            ? yield confirm({
                message: "Do you want to include BetterAuth for authentication?",
                default: true,
            })
            : false;
        // Get other preferences
        const includeLemonsqueezy = yield confirm({
            message: "Do you want to integrate Lemonsqueezy for payments?",
            default: false,
        });
        const includeResend = yield confirm({
            message: "Do you want to set up Resend for email sending?",
            default: false,
        });
        const answers = {
            projectName,
            DB: includeDB,
            betterauth: includeBetterAuth,
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
    const isDB = answers.DB;
    const isBetterAuth = answers.betterauth;
    const isLemonsqueezy = answers.lemonsqueezy;
    const isResend = answers.resend;
    if (isBetterAuth && isDB && !isLemonsqueezy && !isResend) {
        const spinner = ora("Generating BetterAuth files...\n\n").start();
        generateBetterAuthFiles(answers.projectName);
        spinner.succeed("BetterAuth files generated successfully!");
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
