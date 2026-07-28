import type { ProjectConfig } from "../types/project-config.types.js";
import { createNextApp } from "./frontend/nextjs/create-next-app.js";

export const createProject = async (config: ProjectConfig): Promise<void> => {
	switch (config.projectType) {
		case "frontend-only":
			if (config.frontendType === "nextjs") {
				await createNextApp(config);
				return;
			} else if (config.frontendType === "react") {
				// await createReactjsApp(config)
				return;
			}

			throw new Error(`Unsupported frontend framework: ${config.frontendType}`);

		case "backend-only":
			throw new Error("Backend scaffolding has not been implemented yet.");

		case "full-stack":
			throw new Error("Backend scaffolding has not been implemented yet.");

		default: {
			const exhaustiveCheck: never = config.projectType;
			throw new Error(`Unsupported project type: ${exhaustiveCheck}`);
		}
	}
};
