import path from "node:path";
import chalk from "chalk";
import { execa } from "execa";
import type { ProjectConfig } from "../../../types/project-config.types.js";
import { getCreateReactAppCommand } from "../../shared/package-runner.js";
import { ensureDirectoryDoesNotExist } from "../../shared/utils/index.js";

export const createReactApp = async (config: ProjectConfig): Promise<void> => {
	// a non-reactjs config was passed
	if (config.frontendType !== "react") {
		throw new Error(
			"createReactApp received a non-React.js project configuration.",
		);
	}

	const targetDir = path.resolve(process.cwd(), config.projectName);

	await ensureDirectoryDoesNotExist(targetDir);

	const packageCommand = getCreateReactAppCommand(config.packageManager);

	const createReactAppArgs = [
		...packageCommand.args,
		config.projectName,
		"--template",
		"react-ts",
		"--no-interactive",
	];

	console.log(
		chalk.yellow(
			`\nCreating React.js application (vite): ${config.projectName}\n`,
		),
	);

	// create project (react.js)
	await execa(packageCommand.command, createReactAppArgs, {
		cwd: process.cwd(),
		stdio: "inherit",
	});

	console.log(chalk.bgGreen(`\nReact.js application created successfully.\n`));
};
