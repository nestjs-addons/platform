<h1 align="center">Welcome to nest-spectator 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/nest-spectator" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/nest-spectator.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Auto-mocking for Nestjs providers

### 🏠 [Homepage](https://www.npmjs.com/package/nest-spectator)

## Author

👤 **Jay Bell <jay@trellis.org>**

## Usage

See `packages/nest-spectator/__tests__` for reference:

Let's assume you we have the following 2 different Nestjs services:

```
@Injectable()
class PrimaryService {
  constructor(secondaryService: SecondaryService) {
  }

  testFunction(): string {
    return 'test';
  }
}
```

and

```
@Injectable()
class SecondaryService {
}
```

and this controller:

```
@Controller()
class PrimaryController {
  constructor(primaryService: PrimaryService) {
  }
}
```

Currently we have something like:

```
import { Test } from '@nestjs/testing';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';
import { SecondaryService } from './secondary.service';

describe('PrimaryController', () => {
  let primaryController: PrimaryController;
  let primaryService: PrimaryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [PrimaryController],
        providers: [PrimaryService, SecondaryService],
      }).compile();

    primaryService = module.get<PrimaryService>(PrimaryService);
    primaryController = module.get<PrimaryController>(PrimaryController);
  });
});
```

Which is fine for small projects but as your code base grows you could have many injections in your classes constructor that you are testing.
Assuming you plan on creating mocks for the services injected into `PrimaryController` classes or you want to spy on the classes methods of `PrimaryService` your code can start to grow more and more for each time you have a new spec file.

If you do not mock our your services and instead just want to spy on them, your spec files will grow very large because each service you provider in the `Test.createTestingModule` will need to have all of it's services injected as well.

You can see the effect of this in the sample above, `SecondaryService` is injected because `PrimaryService` injects it which in turn is injected into `PrimaryController`

If you are wanting to create mocks for each of these services injected in your class being tested then it would look something like this:

```
import { Test } from '@nestjs/testing';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';
import { SecondaryService } from './secondary.service';

const mockPrimaryService = {
    testFunction: () => {}
}

class MockPrimaryService {
    testFunction(): void {
    }
}

describe('PrimaryController', () => {
  let primaryController: PrimaryController;
  let primaryService: PrimaryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        controllers: [PrimaryController],
        providers: [
            {provide: PrimaryService, useValue: mockPrimaryService}
            // OR
            {provide: PrimaryService, useClass: MockPrimaryService}
        ],
      }).compile();

    primaryService = module.get<PrimaryService>(PrimaryService);
    primaryController = module.get<PrimaryController>(PrimaryController);
  });
});
```

Now you will have to maintain these mock objects for each of your services and ensure you provide over your implementation services in each of your spec files.

This is where `nest-spectator` comes in, inspired by [@ngneat/spectator](https://github.com/ngneat/spectator) for Angular, `nest-spectator` creates a layer on top of the `@nestjs/testing`
`Test.creatingTestingModule` to provide the functionality to auto mock your services so that your module instantiation in tests turns into:

```
beforeEach(async () => {
  module = await createTestingModuleFactory(
      {
        imports: [],
        controllers: [PrimaryController],
        providers: [PrimaryService],
        mocks: [PrimaryService]
      },
  ).compile();
});
```

The `createTestingModuleFactory` accepts all the same values as the `Test.createTestingModule` function except that there is an option property `mocks?: Array<Type<any>>`
that will accept the providers you want to auto mock. This function will return the same value (`TestingModuleBuilder`) as `Test.createTestingModule` will which means we just call
`.compile()` on it after to get our testing module.

If we need access to our services provided to this testing module we get them the same way as we would before since we just have a `TestingModule`.

```
const primaryService = module.get<PrimaryService>(PrimaryService);
```

If `PrimaryService` was included in the `mocks` array during test module instantiation than it will be an object that mirrors the structure of your class as if it was provided normally except
that the methods, getters and setters will all be `jest` Spys themselves.

When providing `PrimaryService` in the mocks array and using `module.get<T>(T)` to get the instance of the provider it will return `SpyObject<PrimaryService>` instead of just `PrimaryService`.

This package is still in alpha so there way be unintended side effects or gaps in the logic. If there is anything you would like to see include please feel free to open an issue.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/yharaskrik/nest-testing/issues). You can also take a look at the [contributing guide](https://www.npmjs.com/package/nest-spectator/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## Stay in touch

- Author - [Wes Grimes](https://wesleygrimes.com)
- Website - [https://github.com/nestjs-addons/in-memory-db](https://github.com/nestjs-addons/in-memory-db/)
- Twitter - [@wesgrimes](https://twitter.com/wesgrimes)

## Maintainers ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://wesleygrimes.com"><img src="https://avatars0.githubusercontent.com/u/324308?v=4" width="100px;" alt="Wes Grimes"/><br /><sub><b>Wes Grimes</b></sub></a><br /><a href="#infra-wesleygrimes" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wesleygrimes" title="Tests">⚠️</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wesleygrimes" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/yharaskrik"><img src="https://avatars.githubusercontent.com/u/9469090?s=460&u=cdb912283b06f43b36da0137e61d66a48f9f7e85&v=4" width="100px;" alt="Jay Bell"/><br /><sub><b>Jay Bell</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=yharaskrik" title="Tests">⚠️</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=yharaskrik" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/cmwhited"><img src="https://avatars0.githubusercontent.com/u/18075124?v=4" width="100px;" alt="Chris Whited"/><br /><sub><b>Chris Whited</b></sub></a><br /><a href="#infra-cmwhited" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=cmwhited" title="Tests">⚠️</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=cmwhited" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wescopeland"><img src="https://avatars0.githubusercontent.com/u/3984985?v=4" width="100px;" alt="Wes Copeland"/><br /><sub><b>Wes Copeland</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wescopeland" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wescopeland" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://hirejordanpowell.com"><img src="https://avatars0.githubusercontent.com/u/3605268?v=4" width="100px;" alt="Jordan"/><br /><sub><b>Jordan</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=jordanpowell88" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=jordanpowell88" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.santoshyadav.dev"><img src="https://avatars3.githubusercontent.com/u/11923975?v=4" width="100px;" alt="Santosh Yadav"/><br /><sub><b>Santosh Yadav</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=santoshyadav198613" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=santoshyadav198613" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/itayod"><img src="https://avatars2.githubusercontent.com/u/6719615?v=4" width="100px;" alt="Itay Oded"/><br /><sub><b>Itay Oded</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=itayod" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=itayod" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

NestJS Addons is [MIT licensed](LICENSE).

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
