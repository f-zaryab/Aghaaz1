import { input } from "@inquirer/prompts";

export const askFrontendPages = async (): Promise<string[]> => {
  const answer = await input({
    message: "Which pages should be created? Separate routes with commas:",
    default: "about, contact",
    validate: validatePageInput,
  });
};
