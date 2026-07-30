import { input } from "@inquirer/prompts";
import { parsePageRoutes, validatePageInput } from "./utils/index.js";

export const askFrontendPages = async (): Promise<string[]> => {
	const answer = await input({
		message: "Which pages should be created? Separate routes with commas:",
		default: "about, contact",
		validate: validatePageInput,
	});

	return parsePageRoutes(answer);
};
