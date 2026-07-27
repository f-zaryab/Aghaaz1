import {
	askBackendChoices,
	askFrontendChoices,
	askPackageManager,
	askProjectName,
	askProjectType,
} from "../prompts/index.js";
import type {
	BackendType,
	FrontendType,
	ProjectConfig,
} from "../types/project-config.types.js";

export const collectProjectConfig = async (): Promise<ProjectConfig> => {
	const projectName = await askProjectName();
	const packageManager = await askPackageManager();
	const projectType = await askProjectType();

	let frontendType: FrontendType | null = null;
	let backendType: BackendType | null = null;

	switch (projectType) {
		case "frontend-only":
			frontendType = await askFrontendChoices();
			break;

		case "backend-only":
			backendType = await askBackendChoices();
			break;

		case "full-stack":
			frontendType = await askFrontendChoices();
			backendType = await askBackendChoices();
			break;
	}

	const projectConfig = {
		projectName,
		packageManager,
		projectType,
		frontendType,
		backendType,
	};

	return projectConfig;
};
