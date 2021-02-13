---
id: in-memory-db-featuremodules
title: Feature Modules
---

## Registering Multiple Instances using `forFeature`

Registering multiple instances for specific feature modules is super simple. Each feature module is guaranteed isolated to that feature. In order to get up and running you need to do the following:

### Registering a forFeature InMemoryDBService

For each feature module(s), do the following:

```typescript
// feature-one.module.ts

import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
...

@Module({
  ...
  imports: [InMemoryDBModule.forFeature('one', {})],
  ...
})
export class FeatureOneModule {}
```

As you can see we:

- Imported `InMemoryDBModule` from `@nestjs-addons/in-memory-db`
- Added `InMemoryDBModule` to the `imports` array in the `@Module` of your choice
- Added the `forFeature` method call passing `one` as the feature name

### Using the Feature Instance

If you would like to use the feature-specific instance, make use of the included `@InjectInMemoryDBService` decorator:

```typescript
@Controller({...})
export class FeatureOneController {
  constructor(@InjectInMemoryDBService('one') private oneService: InMemoryDBService<OneEntity>) {}
  ...
  @Get()
  getAll(): OneEntity[] {
    return this.oneService.getAll();
  }
}
```

Using this decorator ensures that the correct instance is injected.
