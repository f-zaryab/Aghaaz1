import { access } from "node:fs/promises";
import type { ProjectConfig } from "../../../types/project-config.types.js";

export const ensureDirectoryDoesNotExist = async (
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

export const getPackageManagerFlag = (
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
