#!/usr/bin/env node

import chalk from "chalk";
import { existsSync } from "fs";
import path from "path";
import { input } from "@inquirer/prompts";
import { confirm } from "@inquirer/prompts";

import { displayProjectConfig } from "./utils/display-config.js";
import { generateBetterAuthFiles } from "./utils/generate-files/better-auth.js";
import { AllAnswers } from "./types/index.js";
import ora from "ora";

console.log(chalk.blue("\nWelcome to My Custom CLI!\n"));

async function getProjectConfig() {
  // Get project name
  const projectName = await input({
    message: "What is the name of your project?",
    default: "my-project",
    validate: (value: string) => {
      const projectPath = path.join(process.cwd(), value);
      if (existsSync(projectPath)) {
        return chalk.red(
          "A folder with this name already exists. Please choose a different name."
        );
      }
      return true;
    },
  });

  // Get DB preference
  const includeDB = await confirm({
    message: "Do you want to include DB (Drizzle ORM & Neon) for your project?",
    default: true,
  });

  // Get BetterAuth if DB is selected
  const includeBetterAuth = includeDB
    ? await confirm({
        message: "Do you want to include BetterAuth for authentication?",
        default: true,
      })
    : false;

  // Get other preferences
  const includeLemonsqueezy = await confirm({
    message: "Do you want to integrate Lemonsqueezy for payments?",
    default: false,
  });

  const includeResend = await confirm({
    message: "Do you want to set up Resend for email sending?",
    default: false,
  });

  const answers: AllAnswers = {
    projectName,
    DB: includeDB,
    betterauth: includeBetterAuth,
    lemonsqueezy: includeLemonsqueezy,
    resend: includeResend,
  };

  return answers;
}

// Main execution
getProjectConfig()
  .then(async (answers) => {
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
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(
        chalk.yellow(
          "\nPrompt couldn't be rendered in the current environment."
        )
      );
    } else {
      console.log(chalk.red("\nAn error occurred:"));
      console.log(chalk.red(error.message || error));
      console.log(chalk.yellow("\nProcess cancelled. Have a great day! 👋"));
    }
    process.exit(1);
  });
