import { select } from "@inquirer/prompts";

export const askPackageManager = async () => {
  return select({
    message: "Which package manager?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "pnpm", value: "pnpm" },
    ],
  });
};
