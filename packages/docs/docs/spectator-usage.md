---
id: spectator-usage
title: nest-spectator
---

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
