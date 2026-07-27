import { select } from "@inquirer/prompts";

export const askProjectType = async () => {
  return select({
    message: "Project type?",
    choices: [
      { name: "frontend only", value: "frontend-only" },
      { name: "backend only", value: "backend-only" },
      { name: "full stack", value: "full-stack" },
    ],
  });
};
