import { select } from "@inquirer/prompts";
import { BackendType } from "../types/project-config.types.js";

export const askBackendChoices = async (): Promise<BackendType> => {
  return select({
    message: "Choose for backend",
    choices: [
      { name: "nestjs", value: "nestjs" },
      { name: "express", value: "expressjs" },
    ],
  });
};
