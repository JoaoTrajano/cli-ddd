import {
  intro,
  outro,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import color from "picocolors";
import { createModule } from "./actions/create-module.js";

async function main() {
  intro(color.inverse("Create module"));

  const name = await text({
    message: "What name the module",
    placeholder: "user",
  });

  if (isCancel(name)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }
  const s = spinner();

  s.start("Creating module...");
  await createModule(name);
  s.stop("Module created");

  outro("Module created successfully!");
}

main().catch(console.error);
