import { Command } from "commander";

const program = new Command();

program.name("aghaaz").description("Project scaffolding CLI").version("0.1.0");

program
  .command("hello")
  .description("Print hello")
  .action(() => {
    console.log("Hello from Aghaaz 🚀");
  });

program.parse();
