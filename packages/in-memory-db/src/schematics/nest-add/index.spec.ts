import { HostTree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { mockAppModule, mockMain } from '../mocks';

const collectionPath = path.join(__dirname, '../collection.json');

describe('nest add function', () => {
  let tree: UnitTestTree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    tree = new UnitTestTree(new HostTree());
    tree.create('/package.json', JSON.stringify({}));
    tree.create(
      '/nest-cli.json',
      JSON.stringify({
        language: 'ts',
        collection: '@nestjs/schematics',
        sourceRoot: 'src',
      }),
    );
    tree.create('/src/main.ts', mockMain);
    tree.create('/src/app.module.ts', mockAppModule);
    runner = new SchematicTestRunner('schematics', collectionPath);
  });

  it('should add package to module', async (done) => {
    const ngAddTree = await runner.runSchematicAsync('nest-add', '', tree).toPromise();
    const module = ngAddTree.readContent('/src/app.module.ts');
    expect(module).toMatchSnapshot();

    done();
  });
});
