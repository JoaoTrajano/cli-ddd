#!/usr/bin/env node
const { program } = require("commander");
const { createModule } = require("./actions/create-module");

program
  .version("1.0.0")
  .description(
    "Simple CLI that automates common tasks for creating modules using DDD"
  );

program
  .command("create-module <name>")
  .alias("cm")
  .description("Create the new module using DDD")
  .action((name) => {
    createModule(name);
  });

program.parse(process.argv);
