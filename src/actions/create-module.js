import fs from "node:fs";
import path from "node:path";

import { firstLetterCapitalized } from "../helpers/first-letter-capitalized.js";

import { exec } from "child_process";

export const createModule = async (name, option) => {
  const nameCapitalized = firstLetterCapitalized(name);

  const moduloPath = path.join(process.cwd(), "src", "modules", name);

  fs.mkdirSync(moduloPath, { recursive: true });
  fs.mkdirSync(path.join(moduloPath, "application"), { recursive: true });
  fs.mkdirSync(path.join(moduloPath, "presentation"), { recursive: true });
  fs.mkdirSync(path.join(moduloPath, "presentation", "controller"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "presentation", "presenter"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "application", "usecases"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "application", "services"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "domain", "entities", "__tests__"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "infrastructure", "adapters"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "infrastructure", "mappers"), {
    recursive: true,
  });

  fs.writeFileSync(
    path.join(
      moduloPath,
      "presentation",
      "controller",
      `${name}.controller.ts`
    ),
    `export class ${nameCapitalized}Controller {
  constructor() {}
 
}`
  );

  fs.writeFileSync(
    path.join(moduloPath, "presentation", "presenter", `${name}.presenter.ts`),
    `export class ${nameCapitalized}Presenter {
  constructor() {}
 
}`
  );

  fs.writeFileSync(
    path.join(moduloPath, "application", "services", `${name}.service.ts`),
    `export class ${nameCapitalized}Service {
  constructor() {}
 
}`
  );

  fs.writeFileSync(
    path.join(moduloPath, "domain", "entities", "__tests__", `${name}.spec.ts`),
    `describe('${nameCapitalized}Entity test', () => {
  beforeEach(() => {})
})`
  );

  fs.writeFileSync(
    path.join(moduloPath, "application", "usecases", `${name}.usecase.ts`),
    `export class ${nameCapitalized}UseCase {
  constructor() {}

  async execute() {}
}`
  );

  fs.writeFileSync(
    path.join(moduloPath, "domain", "entities", `${name}.entity.ts`),
    `export class ${nameCapitalized}Entity {
  constructor() {}
}

`
  );

  fs.writeFileSync(
    path.join(
      moduloPath,
      "infrastructure",
      "adapters",
      `${name}.repository.ts`
    ),
    `export class Repository${nameCapitalized} {
}

;`
  );

  if (option === "y") {
    exec(`nest -g module ${moduloPath} `, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error}`);
        return;
      }
      console.log(`Saída do comando: ${stdout}`);
    });
  }

  //   fs.writeFileSync(
  //     path.join(moduloPath, `${name}.module.ts`),
  //     `import { Module } from '@nestjs/common';
  // import { ${nameCapitalized}UseCase } from './application/usecases/${name}.usecase.ts';
  // import { ${nameCapitalized} } from './domain/entities/${name}';
  // import { Repository${nameCapitalized} } from './infrastructure/adapters/${name}.repository.ts';

  // @Module({
  //   imports: [],
  //   controllers: [],
  //   providers: [${nameCapitalized}UseCase, ${nameCapitalized}, Repository${nameCapitalized}],
  // })
  // export class ${nameCapitalized}Module {}`
  //   );

  // const logger = winston.createLogger({
  //   format: winston.format.combine(
  //     winston.format.colorize(),
  //     winston.format.printf(({ level, message }) => {
  //       return `[${level}] ${message}`;
  //     })
  //   ),
  //   transports: [new winston.transports.Console()],
  // });

  // logger.info(`Module ${nameCapitalized} created with success!`, {
  //   nameCapitalized,
  // });
};
