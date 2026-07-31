import { input } from "@inquirer/prompts";
import { parseFeatureNames, validateFeatureInput } from "./utils/index.js";

export const askFrontendFeatures = async (): Promise<string[]> => {
	const answer = await input({
		message: "Which features should be created? Separate features with commas:",
		default: "auth, product",
		validate: validateFeatureInput,
	});

	return parseFeatureNames(answer);
};
