import { access } from "node:fs/promises";
import path from "node:path";
import { execa } from "execa";
import type { ProjectConfig } from "../../../types/project-config.types.js";
import { getCreateNextAppCommand } from "../package-runner.js";

export const createNextApp = async (config: ProjectConfig): Promise<void> => {
	// a non-nextjs config was passed
	if (config.frontendType !== "nextjs") {
		throw new Error(
			"createNextApp received a non-Next.js project configuration.",
		);
	}

	const targetDir = path.resolve(process.cwd(), config.projectName);

	await ensureDirectoryDoesNotExist(targetDir);

	const packageCommand = getCreateNextAppCommand(config.packageManager);

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

		// Ensure create-next-app uses the selected package manager
		getPackageManagerFlag(config.packageManager),
	];

	console.log(`\nCreating Next.js application: ${config.projectName}\n`);

	await execa(packageCommand.command, createNextjsApp, {
		cwd: process.cwd(),
		stdio: "inherit",
	});
};

const ensureDirectoryDoesNotExist = async (
	targetDirectory: string,
): Promise<void> => {
	try {
		await access(targetDirectory);

		throw new Error(`Directory already exists: ${targetDirectory}`);
	} catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			return;
		}

		throw error;
	}
};

const getPackageManagerFlag = (
	packageManager: ProjectConfig["packageManager"],
): string => {
	switch (packageManager) {
		case "npm":
			return "--use-npm";

		case "pnpm":
			return "--use-pnpm";

		default: {
			const exhaustiveCheck: never = packageManager;
			throw new Error(`Unsupported package manager: ${exhaustiveCheck}`);
		}
	}
};
