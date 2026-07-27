import { Command } from "commander";
import chalk from "chalk";
import {
  askProjectName,
  askPackageManager,
  askProjectType,
  askFrontendChoices,
  askBackendChoices,
} from "./prompts/index.js";

const program = new Command();

// Package Introduction
program.name("aghaaz").description("Project scaffolding CLI").version("0.1.0");

// Testing program
program
  .command("hello")
  .description("Print hello")
  .action(() => {
    console.log("Hello from Aghaaz 🚀");
  });

// Package Selector
program
  .command("create")
  .description("Create project")
  .action(async () => {
    const projectName = await askProjectName();
    const packageManager = await askPackageManager();
    const projectType = await askProjectType();

    let frontendType;
    let backendType;

    if (projectType === "frontend-only") {
      frontendType = await askFrontendChoices();
    }

    if (projectType === "backend-only") {
      backendType = await askBackendChoices();
    }

    if (projectType === "full-stack") {
      frontendType = await askFrontendChoices();
      backendType = await askBackendChoices();
    }

    const projectConfig = {
      projectName: projectName,
      packageManager: packageManager,
      projectType: projectType,
      frontendType: frontendType,
      backendType: backendType || null,
    };

    // Consoling for now:
    console.log(chalk.green("\nConfiguration"));
    console.log(chalk.gray("────────────────────"));

    console.log(`Project Name    : ${chalk.cyan(projectName)}`);
    console.log(`Package Manager : ${chalk.cyan(packageManager)}`);
    console.log(`Project Type    : ${chalk.cyan(projectType)}`);

    if (frontendType) {
      console.log(`Frontend        : ${chalk.cyan(frontendType)}`);
    }

    if (backendType) {
      console.log(`Backend         : ${chalk.cyan(backendType)}`);
    }

    console.log(chalk.yellow(JSON.stringify(projectConfig)));
  });

program.parse();
