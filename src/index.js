#!/usr/bin/env node

import { intro, outro, spinner, isCancel, cancel, text } from "@clack/prompts";
import color from "picocolors";
import ModuleCreator from "./actions/ModuleCreator.js";

async function main() {
  try {
    intro(color.green(color.green(" Create Module ")));

    outro("Let's create a new module!");

    let name = "";
    while (!name) {
      name = await text({
        message: color.bold("What will be the name of the module?"),
        placeholder: "user",
      });
      if (isCancel(name)) {
        cancel(color.yellow("Operation cancelled"));
        return process.exit(0);
      } else if (!name.trim()) {
        console.log(
          color.red("Module name cannot be empty. Please enter a valid name.")
        );
        name = "";
      }
    }

    let usingNest = "";
    while (usingNest !== "y" && usingNest !== "n") {
      usingNest = await text({
        message: color.bold("Are you using Nest.js? (y/n)"),
        placeholder: "y/n",
      });
      if (isCancel(usingNest)) {
        cancel(color.yellow("Operation cancelled"));
        return process.exit(0);
      } else if (usingNest !== "y" && usingNest !== "n") {
        console.log(color.red("Invalid option. Please choose 'y' or 'n'."));
      }
    }

    const s = spinner();

    s.start(color.bold("Creating module..."));
    const moduleCreator = new ModuleCreator(name, usingNest);
    await moduleCreator.createModule();
    s.stop(color.green("Module created"));

    outro(color.bold("Module created successfully!"));
  } catch (error) {
    console.error(color.red("An error occurred:"), error);
    process.exit(1);
  }
}

main();
