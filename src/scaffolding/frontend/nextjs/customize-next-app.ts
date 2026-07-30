import type { ProjectConfig } from "../../../types/project-config.types.js";
import { generatePages, generateProjectStructure } from "./generators/index.js";

type CustomizeNextAppOptions = {
	config: ProjectConfig;
	targetDir: string;
};

export const customizeNextApp = async ({
	config,
	targetDir,
}: CustomizeNextAppOptions): Promise<void> => {
	await generateProjectStructure(targetDir);

	await generatePages({
		targetDir,
		pages: config.frontendPages,
	});
};
