import { select } from "@inquirer/prompts";
import type { FrontendHttpClient } from "../types/project-config.types.js";

export const askFrontendHttpClient = async (): Promise<FrontendHttpClient> => {
	return select({
		message: "Select styling options",
		choices: [
			{ name: "axios", value: "axios" },
			{ name: "ky", value: "ky" },
			{ name: "native-fetch", value: "native-fetch" },
		],
	});
};
