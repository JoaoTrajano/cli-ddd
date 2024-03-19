import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { exec } from "child_process";
import { firstLetterCapitalized } from "../helpers/first-letter-capitalized.js";

class ModuleCreator {
  constructor(name = "", options = "") {
    this.name = name;
    this.options = options;
  }

  async createModule() {
    try {
      if (!this.name) {
        throw new Error("O nome do módulo é obrigatório.");
      }

      const nameCapitalized = firstLetterCapitalized(this.name);
      const moduloPath = path.join(process.cwd(), "src", "modules", this.name);

      await this.createModuleDirectories(moduloPath);
      await this.createModuleFiles(moduloPath, nameCapitalized, this.name);

      if (this.options === "y") {
        this.generateNestModule(this.name);
      }
    } catch (err) {
      console.error("Ocorreu um erro ao criar o módulo:", err);
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
    exec(`nest g module modules/${name} `, (error, stdout) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error}`);
        return;
      }
    });
  }
}

export default ModuleCreator;
