import { select } from "@inquirer/prompts";

export const askFrontendChoices = async () => {
  return select({
    message: "Choose for frontend",
    choices: [
      { name: "react", value: "react" },
      { name: "nextjs", value: "nextjs" },
    ],
  });
};
