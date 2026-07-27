import { input } from "@inquirer/prompts";

export const askProjectName = async () => {
  return input({
    message: "Project name?",
  });
};
