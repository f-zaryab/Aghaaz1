import { select } from "@inquirer/prompts";
import type { FrontendStyling } from "../types/project-config.types.js";

export const askFrontendStyling = async (): Promise<FrontendStyling> => {
	return select({
		message: "Select styling options",
		choices: [
			{ name: "tailwind css", value: "tailwind-css" },
			{ name: "none", value: "none" },
		],
	});
};
