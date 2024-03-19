const fs = require("fs");
const path = require("path");
const winston = require("winston");

function createModule(name) {
  const moduloPath = path.join(process.cwd(), "src", "modules", name);

  fs.mkdirSync(moduloPath, { recursive: true });
  fs.mkdirSync(path.join(moduloPath, "application"), { recursive: true });
  fs.mkdirSync(path.join(moduloPath, "application", "usecases"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "application", "mappers"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "domain", "entities"), {
    recursive: true,
  });
  fs.mkdirSync(path.join(moduloPath, "infrastructure", "adapters"), {
    recursive: true,
  });

  fs.writeFileSync(
    path.join(moduloPath, "application", "usecases", `${name}.usecase.ts`),
    `export class ${name}UseCase {
  constructor() {}

  async execute() {}
}`
  );

  fs.writeFileSync(
    path.join(moduloPath, "domain", "entities", `${name}.entity.ts`),
    `export class ${name} {
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
    `export class Repository${name} {
}

;`
  );

  fs.writeFileSync(
    path.join(moduloPath, "index.ts"),
    `import { Module } from '@nestjs/common';
import { ${name}UseCase } from './application/usecases/${name}.usecase.ts';
import { ${name} } from './domain/entities/${name}';
import { Repository${name} } from './infrastructure/adapters/${name}.repository.ts';

@Module({
  imports: [],
  controllers: [],
  providers: [${name}UseCase, ${name}, Repository${name}],
})
export class ${name}Module {}`
  );

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message }) => {
        return `[${level}] ${message}`;
      })
    ),
    transports: [new winston.transports.Console()],
  });

  logger.info(`Module ${name} created with success!`, {
    name,
  });
}

module.exports = { createModule };
