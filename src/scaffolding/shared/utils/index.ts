import { access } from "node:fs/promises";
import path from "node:path";
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

// FOR PAGE TEMPLATE --------------------------------------
export const capitalize = (value: string): string =>
	value.charAt(0).toUpperCase() + value.slice(1);

export const convertToPascalCase = (value: string): string =>
	value.split("-").filter(Boolean).map(capitalize).join("");

export const createPageTitle = (route: string): string => {
	const finalSegment = route.split("/").at(-1) ?? route;

	return finalSegment.split("-").map(capitalize).join(" ");
};

export const createPageComponentName = (route: string): string => {
	// Example: dashboard/settings -> DashboardSettingsPage
	// Example: contact-us -> ContactUsPage
	const routeName = route.split("/").map(convertToPascalCase).join("");

	return `${routeName}Page`;
};

// FOR STATIC PAGE GENERATION -------------------------------
export const assertPathInsideAppDirectory = ({
	appDir,
	targetPath,
}: {
	appDir: string;
	targetPath: string;
}): void => {
	const relativePath = path.relative(appDir, targetPath);

	const isOutsideAppDirectory =
		relativePath.startsWith("..") || path.isAbsolute(relativePath);

	if (isOutsideAppDirectory) {
		throw new Error(`Unsafe page path: "${targetPath}".`);
	}
};

export const pathExists = async (targetPath: string): Promise<boolean> => {
	try {
		await access(targetPath);
		return true;
	} catch {
		return false;
	}
};
