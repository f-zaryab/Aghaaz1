import { select } from "@inquirer/prompts";
import { PackageManager } from "../types/project-config.types.js";

export const askPackageManager = async (): Promise<PackageManager> => {
  return select({
    message: "Which package manager?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "pnpm", value: "pnpm" },
    ],
  });
};
