#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { displayProjectConfig } from "./utils/displayConfig.js";
import { generateBetterAuthFiles } from "./utils/generate-files/better-auth.js";
import { existsSync } from "fs";
import path from "path";

const PASSWORD = "rezaali83@";

console.log(chalk.blue("\nWelcome to My Custom CLI!\n"));
console.log(
  chalk.red(
    "Noone is allowed to use this CLI without the password. Please enter the password to continue.\n"
  )
);

let passwordAttempts = 0;

const passwordQuestion = {
  type: "password",
  name: "password",
  message: "Enter the password:",
  mask: "*",
  validate: (input) => {
    passwordAttempts++;
    if (input !== PASSWORD) {
      if (passwordAttempts >= 3) {
        console.log(
          chalk.red("\nToo many failed attempts. Process terminated.\n")
        );
        process.exit(1);
      }
      return `Password is incorrect. ${
        3 - passwordAttempts
      } attempts remaining.`;
    }
    return true;
  },
};

const dbQuestion = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    default: "my-project",
    validate: (input) => {
      const projectPath = path.join(process.cwd(), input);
      if (existsSync(projectPath)) {
        return chalk.red(
          "A folder with this name already exists. Please choose a different name."
        );
      }
      return true;
    },
  },
  {
    type: "confirm",
    name: "DB",
    message: "Do you want to include DB (Drizzle ORM & Neon) for your project?",
    default: true,
  },
];

const projectQuestions = [
  {
    type: "confirm",
    name: "lemonsqueezy",
    message: "Do you want to integrate Lemonsqueezy for payments?",
    default: false,
  },
  {
    type: "confirm",
    name: "resend",
    message: "Do you want to set up Resend for email sending?",
    default: false,
  },
];

inquirer
  .prompt(passwordQuestion)
  .then(() => {
    inquirer
      .prompt(dbQuestion)
      .then((dbAnswer) => {
        const questions = [...projectQuestions];
        if (dbAnswer.DB) {
          questions.unshift({
            type: "confirm",
            name: "betterauth",
            message: "Do you want to include BetterAuth for authentication?",
            default: true,
          });
        }
        return inquirer
          .prompt(questions)
          .then((answers) => ({ ...dbAnswer, ...answers }));
      })
      .then(async (answers) => {
        displayProjectConfig(answers);

        const isDB = answers.DB;
        const isBetterAuth = answers.betterauth;
        const isLemonsqueezy = answers.lemonsqueezy;
        const isResend = answers.resend;

        if (isBetterAuth && isDB && !isLemonsqueezy && !isResend) {
          generateBetterAuthFiles(answers.projectName);
        }

        // Add your logic to configure the project based on these selections
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
          console.log(
            chalk.yellow("\nProcess cancelled. Have a great day! 👋")
          );
        }
        process.exit(1);
      });
  })
  .catch((error) => {
    console.log(chalk.red("\nAn error occurred:"));
    console.log(chalk.red(error.message || error));
    console.log(chalk.yellow("\nProcess cancelled. Have a great day! 👋"));
    process.exit(1);
  });
