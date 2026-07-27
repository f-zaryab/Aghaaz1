import { input } from "@inquirer/prompts";

const PROJECT_NAME_PATTERN = /^[a-z0-9][a-z0-9-_]*$/;

export const askProjectName = async (): Promise<string> => {
	return input({
		message: "Project name?",

		validate(value) {
			const normalizedName = value.trim();

			if (!normalizedName) {
				return "Project name is required.";
			}

			if (!PROJECT_NAME_PATTERN.test(normalizedName)) {
				return "Use lowercase letters, numbers, hyphens, or underscores.";
			}

			return true;
		},

		transformer(value) {
			return value.trim();
		},
	});
};
