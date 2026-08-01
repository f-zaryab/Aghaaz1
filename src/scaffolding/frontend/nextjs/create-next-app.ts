import path from "node:path";
import { execa } from "execa";
import type { ProjectConfig } from "../../../types/project-config.types.js";
import {
	ensureDirectoryDoesNotExist,
	getPackageManagerFlag,
} from "../../shared/utils/index.js";
import { getCreateNextAppCommand } from "../shared/generators/package-installations/package-runner/package-runner.js";
import { customizeNextApp } from "./customize-next-app.js";

export const createNextApp = async (config: ProjectConfig): Promise<void> => {
	// a non-nextjs config was passed
	if (config.frontendType !== "nextjs") {
		throw new Error(
			"createNextApp received a non-Next.js project configuration.",
		);
	}

	// E.g. path.resolve("C:\\Projects", "myApp") => C:\Projects\myApp
	const targetDir = path.resolve(process.cwd(), config.projectName);

	await ensureDirectoryDoesNotExist(targetDir);

	const packageCommand = getCreateNextAppCommand(config.packageManager);

	// Using official nextjs installer with required flags
	const createNextjsApp = [
		...packageCommand.args,
		config.projectName,

		//Project defaults
		"--typescript",
		"--app",
		"--src-dir",
		"--import-alias",
		"@/*",

		// Avoid create-next-app questions
		"--yes",

		// Aghaaz will configure linting separately
		"--no-linter",

		// Styling selection
		config.frontendStyleChoice === "tailwind-css"
			? "--tailwind"
			: "--no-tailwind",

		// Ensure create-next-app uses the selected package manager
		getPackageManagerFlag(config.packageManager),
	];

	console.log(`\nCreating Next.js application: ${config.projectName}\n`);

	// Create project (nextjs app)
	await execa(packageCommand.command, createNextjsApp, {
		cwd: process.cwd(),
		stdio: "inherit",
	});

	// Customize project(nextjs app)
	await customizeNextApp({
		config,
		targetDir,
	});

	console.log(`\nNext.js application created successfully.\n`);
};
