---
id: in-memory-db-quickstart
title: Quick Start
---

## Import into Module(s)

To get started, let's first update our `app.module.ts` to include the necessary pieces.

> While we are importing to the AppModule in this example, InMemoryDBModule could be imported in Feature modules just as well.

### Registering a forRoot InMemoryDBModule

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
...

@Module({
  ...
  imports: [InMemoryDBModule.forRoot({})],
  ...
})
export class AppModule {}
```

As you can see we did the following:

- Import `InMemoryDBModule` from `@nestjs-addons/in-memory-db`
- Add `InMemoryDBModule` to the `imports` array in the `@Module` of your choice

## Define an interface for each InMemoryEntity

An instance of `InMemoryDBService<T>` will be created for each `InMemoryDBEntity` entity `interface` defined. The `InMemoryDBEntity` adds an `id: string` property as the only required field. Additional fields can be defined by extending the `interface`.

To define a new `InMemoryDBEntity` extension create an `interface` similar to the following example:

```typescript
interface UserEntity extends InMemoryDBEntity {
  firstName: string;
  lastName: string;
  emailAddress: string;
  admin: boolean;
}
```

Now we can make use of our new `interface` when injecting the `InMemoryDBService<T>` into our controllers or other services.

## Inject into Controller(s) and/or Services(s)

In order to use the `InMemoryDBService<T>` we need to do the following:

- Add `private readonly inMemoryDB: InMemoryDBService<T>` to the `constructor` of each controller and/or service that you would like to use it in.
- Begin using `InMemoryDBService` as expected.

An example of injecting `InMemoryDBService` into a `UserController` for the `UserEntity` we defined earlier would look something like this:

```typescript
@Controller()
export class UserController {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) {}

  @Get('users/:id')
  getUser(@Param() id: string): UserEntity {
    return this.userService.get(id);
  }

  @Post('users')
  createUser(@Body() user: UserEntity): UserEntity {
    return this.userService.create(user);
  }
}
```
