---
id: in-memory-db-entitycontroller
title: Entity Controller
---

In order to prevent code duplication and boilerplate for each controller, we have created two base entity controllers `InMemoryDBEntityController` and `InMemoryDBEntityAsyncController`. This allows you to quickly provide endpoints to make requests without having to manually implement each action.

To use the controllers, simply create a new controller and extend it with one of the provided base controllers.

```typescript
@Controller('api/users')
class UsersController extends InMemoryDBEntityController<UserEntity> {
  constructor(protected dbService: InMemoryDBService<UserEntity>) {
    super(dbService);
  }
}
```

In order to have an Entity Controller use a feature-specific instance of the service, use the decorator `InjectInMemoryDBService` in the controller's provided by this library as shown below:

```typescript
@Controller('api/users')
class UsersController extends InMemoryDBEntityController<UserEntity> {
  constructor(
    @InjectInMemoryDBService('customer')
    protected readonly inMemoryDBService: InMemoryDBService<UserEntity>,
  ) {
    super(inMemoryDBService);
  }
}
```