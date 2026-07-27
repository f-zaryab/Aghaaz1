import { select } from "@inquirer/prompts";
import type { FrontendType } from "../types/project-config.types.js";

export const askFrontendChoices = async (): Promise<FrontendType> => {
	return select({
		message: "Choose for frontend",
		choices: [
			{ name: "react", value: "react" },
			{ name: "nextjs", value: "nextjs" },
		],
	});
};
