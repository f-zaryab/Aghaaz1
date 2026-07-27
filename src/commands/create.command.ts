import { Command } from "commander";
import { collectProjectConfig } from "../config/collect-requirements.config.js";
import chalk from "chalk";

export function createCreateCommand(): Command {
  return new Command("create")
    .description("Create a new project")
    .action(async () => {
      const projectConfig = await collectProjectConfig();

      // printProjectConfig(projectConfig);
      console.log(chalk.blue(JSON.stringify(projectConfig)));

      // Later:
      // await scaffoldProject(projectConfig);
    });
}
