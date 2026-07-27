import { select } from "@inquirer/prompts";

export const askBackendChoices = async () => {
  return select({
    message: "Choose for backend",
    choices: [
      { name: "nestjs", value: "nestjs" },
      { name: "express", value: "expressjs" },
    ],
  });
};
