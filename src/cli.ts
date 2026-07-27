import { Command } from "commander";
import { createCreateCommand } from "./commands/create.command.js";

export function createCli(): Command {
  const program = new Command();

  program
    .name("aghaaz")
    .description("Project scaffolding CLI")
    .version("0.1.0");

  // create
  program.addCommand(createCreateCommand());

  return program;
}
