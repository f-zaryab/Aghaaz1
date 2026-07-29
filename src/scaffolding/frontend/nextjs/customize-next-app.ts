import type { ProjectConfig } from "../../../types/project-config.types.js";

type CustomizeNextAppOptions = {
	config: ProjectConfig;
	targetDirectory: string;
};

export const customizeNextApp = async ({
	config,
	targetDirectory,
}: CustomizeNextAppOptions) => {};
