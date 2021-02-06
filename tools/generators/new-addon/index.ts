import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';

export default function (schema: any): Rule {
  return chain([
    externalSchematic('@nrwl/nest', 'lib', {
      name: schema.name,
    }),
  ]);
}
