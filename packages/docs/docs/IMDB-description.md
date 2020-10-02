---
id: in-memory-db-index
title: Introduction
---

`@nestjs-addons/in-memory-db` provides a ridiculously simple, no configuration needed, way to create a simple in-memory database for use in your `nestjs` applications. You simply define an `interface` that extends the `interface InMemoryDBEntity`, inject the `InMemoryDBService<T>` into your controllers and/or services, and immediately profit. The records are stored in-memory, as a singleton, for each interface, for the life of the service.

This provides a great way to quickly get up and running with prototypes and mock backends.