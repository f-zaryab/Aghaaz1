import { select } from "@inquirer/prompts";
import type { ProjectType } from "../types/project-config.types.js";

export const askProjectType = async (): Promise<ProjectType> => {
	return select({
		message: "Project type?",
		choices: [
			{ name: "frontend only", value: "frontend-only" },
			{ name: "backend only", value: "backend-only" },
			{ name: "full stack", value: "full-stack" },
		],
	});
};
