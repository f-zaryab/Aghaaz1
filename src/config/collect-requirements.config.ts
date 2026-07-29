import {
	askBackendChoices,
	askFrontendChoices,
	askFrontendComponentLib,
	askFrontendHttpClient,
	askFrontendStyling,
	askPackageManager,
	askProjectName,
	askProjectType,
} from "../prompts/index.js";
import type {
	BackendType,
	FrontendComponentLibrary,
	FrontendHttpClient,
	FrontendStyling,
	FrontendType,
	ProjectConfig,
} from "../types/project-config.types.js";

export const collectProjectConfig = async (): Promise<ProjectConfig> => {
	const projectName = await askProjectName();
	const packageManager = await askPackageManager();
	const projectType = await askProjectType();

	let frontendType: FrontendType | null = null;
	let backendType: BackendType | null = null;

	// frontend specific questions
	let frontendHttpClient: FrontendHttpClient | null = null;
	let frontendStyleChoice: FrontendStyling | null = null;
	let frontendComponentLibrary: FrontendComponentLibrary | null = null;

	switch (projectType) {
		case "frontend-only":
			frontendType = await askFrontendChoices();
			frontendStyleChoice = await askFrontendStyling();
			frontendComponentLibrary = await askFrontendComponentLib();
			frontendHttpClient = await askFrontendHttpClient();
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
		frontendHttpClient,
		frontendStyleChoice,
		frontendComponentLibrary,
	};

	return projectConfig;
};
