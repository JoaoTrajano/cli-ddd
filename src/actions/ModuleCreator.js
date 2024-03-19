import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { exec } from "node:child_process";
import { firstLetterCapitalized } from "../helpers/first-letter-capitalized.js";

class ModuleCreator {
  constructor(name = "", options = "") {
    this.name = name;
    this.options = options;
  }

  async createModule() {
    try {
      if (!this.name) {
        throw new Error("Module name is required.");
      }

      const nameCapitalized = firstLetterCapitalized(this.name);
      const moduloPath = path.join(process.cwd(), "src", "modules", this.name);

      await this.createModuleDirectories(moduloPath);
      await this.createModuleFiles(moduloPath, nameCapitalized, this.name);
    } catch (err) {
      console.error("An error occurred while creating the module:", err);
    }
  }

  async createModuleDirectories(moduloPath) {
    const directories = [
      "application",
      "presentation",
      "presentation/controller",
      "presentation/presenter",
      "application/usecases",
      "application/services",
      "domain/entities/__tests__",
      "infrastructure/adapters",
      "infrastructure/mappers",
    ];

    for (const dir of directories) {
      await promisify(fs.mkdir)(path.join(moduloPath, dir), {
        recursive: true,
      });
    }
  }

  async createModuleFiles(moduloPath, nameCapitalized, name) {
    if (this.options === "y") {
      const files = [
        {
          path: path.join(
            moduloPath,
            "presentation",
            "presenter",
            `${name}.presenter.ts`
          ),
          content: `export class ${nameCapitalized}Presenter {\n  constructor() {}\n}`,
        },
        {
          path: path.join(
            moduloPath,
            "domain",
            "entities",
            "__tests__",
            `${name}.spec.ts`
          ),
          content: `describe('${nameCapitalized}Entity test', () => {\n  beforeEach(() => {})\n})`,
        },
        {
          path: path.join(
            moduloPath,
            "application",
            "usecases",
            `${name}.usecase.ts`
          ),
          content: `export class ${nameCapitalized}UseCase {\n  constructor() {}\n\n  async execute() {}\n}`,
        },
        {
          path: path.join(
            moduloPath,
            "domain",
            "entities",
            `${name}.entity.ts`
          ),
          content: `export class ${nameCapitalized}Entity {\n  constructor() {}\n}`,
        },
        {
          path: path.join(
            moduloPath,
            "infrastructure",
            "adapters",
            `${name}.repository.ts`
          ),
          content: `export class Repository${nameCapitalized} {\n}`,
        },
      ];

      for (const file of files) {
        await promisify(fs.writeFile)(file.path, file.content);
      }

      this.nestGenerateFiles();
      return;
    }

    const files = [
      {
        path: path.join(
          moduloPath,
          "presentation",
          "controller",
          `${name}.controller.ts`
        ),
        content: `export class ${nameCapitalized}Controller {\n  constructor() {}\n}`,
      },
      {
        path: path.join(
          moduloPath,
          "presentation",
          "presenter",
          `${name}.presenter.ts`
        ),
        content: `export class ${nameCapitalized}Presenter {\n  constructor() {}\n}`,
      },
      {
        path: path.join(
          moduloPath,
          "application",
          "services",
          `${name}.service.ts`
        ),
        content: `export class ${nameCapitalized}Service {\n  constructor() {}\n}`,
      },
      {
        path: path.join(
          moduloPath,
          "domain",
          "entities",
          "__tests__",
          `${name}.spec.ts`
        ),
        content: `describe('${nameCapitalized}Entity test', () => {\n  beforeEach(() => {})\n})`,
      },
      {
        path: path.join(
          moduloPath,
          "application",
          "usecases",
          `${name}.usecase.ts`
        ),
        content: `export class ${nameCapitalized}UseCase {\n  constructor() {}\n\n  async execute() {}\n}`,
      },
      {
        path: path.join(moduloPath, "domain", "entities", `${name}.entity.ts`),
        content: `export class ${nameCapitalized}Entity {\n  constructor() {}\n}`,
      },
      {
        path: path.join(
          moduloPath,
          "infrastructure",
          "adapters",
          `${name}.repository.ts`
        ),
        content: `export class Repository${nameCapitalized} {\n}`,
      },
    ];

    for (const file of files) {
      await promisify(fs.writeFile)(file.path, file.content);
    }
  }

  generateNestModule(name) {
    exec(`nest g module modules/${name} --flat`, (error, stdout) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
    });
  }
  generateNestService(name) {
    exec(
      `nest g service modules/${name}/application/services/${name} --flat `,
      (error, stdout) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
      }
    );
  }
  generateNestController(name) {
    exec(
      `nest g controller modules/${name}/presentation/controller/${name}  --flat`,
      (error, stdout) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
      }
    );
  }

  nestGenerateFiles() {
    this.generateNestModule(this.name);
    this.generateNestService(this.name);
    this.generateNestController(this.name);
  }
}

export default ModuleCreator;
