import chalk from "chalk";
import { Command } from "commander";
import { collectProjectConfig } from "../config/collect-requirements.config.js";
import { createProject } from "../scaffolding/create-project.js";

export function createCreateCommand(): Command {
	return new Command("create")
		.description("Create a new project")
		.action(async () => {
			// Collecting user input and constructing config
			const projectConfig = await collectProjectConfig();

			// printProjectConfig(projectConfig);
			console.log(chalk.blue(JSON.stringify(projectConfig)));

			// Creating Project
			await createProject(projectConfig);

			console.log(chalk.greenBright("Happy hacking! :)"));
		});
}
