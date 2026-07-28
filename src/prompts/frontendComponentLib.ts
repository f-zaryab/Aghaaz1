import { select } from "@inquirer/prompts";
import type { FrontendComponentLibrary } from "../types/project-config.types.js";

export const askFrontendComponentLib =
	async (): Promise<FrontendComponentLibrary> => {
		return select({
			message: "Select a component library",
			choices: [
				{ name: "mantine", value: "mantine" },
				{ name: "material ui", value: "material-ui" },
				{ name: "none", value: "none" },
			],
		});
	};
