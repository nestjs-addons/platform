/** Credit to: Valentin Buryakov
 * @ngneat/spectator - https://github.com/ngneat/spectator
 */
import { Provider, Type } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces';

type Writable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * @publicApi
 */
export type BaseSpyObject<T, A> = T &
  {
    [P in keyof T]: T[P] extends (...args: A[]) => T
      ? T[P] & CompatibleSpy<T, A>
      : T[P];
  } & {
    /**
     * Casts to type without readonly properties
     */
    castToWritable(): Writable<T>;
  };

/**
 * @publicApi
 */
export interface CompatibleSpy<T, A> extends jasmine.Spy {
  /**
   * By chaining the spy with and.returnValue, all calls to the function will return a specific
   * value.
   */
  andReturn(val: T): void;

  /**
   * By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied
   * function.
   */
  andCallFake(fn: (...args: A[]) => T): this;

  /**
   * removes all recorded calls
   */
  reset(): void;
}

/**
 * @publicApi
 */
export type SpyObject<T, A> = BaseSpyObject<T, A> &
  {
    [P in keyof T]: T[P] &
      (T[P] extends (...args: A[]) => infer R ? jest.Mock<R> : T[P]);
  };

/**
 * @internal
 */
export function installProtoMethods<T, A>(
  mock: BaseSpyObject<T, A>,
  proto: T,
  createSpyFn: (...args: string[]) => T,
): void {
  if (proto === null || proto === Object.prototype) {
    return;
  }

  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (!descriptor) {
      continue;
    }

    if (
      typeof descriptor.value === 'function' &&
      key !== 'constructor' &&
      typeof mock[key] === 'undefined'
    ) {
      mock[key] = createSpyFn(key);
    } else if (
      descriptor.get &&
      !Object.prototype.hasOwnProperty.call(mock, key)
    ) {
      Object.defineProperty(mock, key, {
        set: (value) => (mock[`_${key}`] = value),
        get: () => mock[`_${key}`],
      });
    }
  }

  installProtoMethods(mock, Object.getPrototypeOf(proto), createSpyFn);

  mock.castToWritable = () => mock;
}

/**
 * @publicApi
 */
export function createSpyObject<T, A>(
  type: Provider<T> & { prototype: T },
  template?: Partial<Record<keyof T, T>>,
): SpyObject<T, A> {
  const mock: SpyObject<T, A> =
    ({ ...template } as SpyObject<T, A>) || ({} as SpyObject<T, A>);

  installProtoMethods(mock, type.prototype, () => {
    const jestFn = jest.fn();
    const newSpy: CompatibleSpy<T, A> = jestFn as never;

    newSpy.andCallFake = (fn: (...args: A[]) => T) => {
      jestFn.mockImplementation(fn as (...args: A[]) => T);

      return newSpy;
    };

    newSpy.andReturn = (val: T) => {
      jestFn.mockReturnValue(val);
    };

    newSpy.reset = () => {
      jestFn.mockReset();
    };

    return newSpy;
  });

  return mock;
}

/**
 * @publicApi
 */
export function mockProvider<T, A>(
  type: Type<T, A>,
  properties?: Partial<Record<keyof T, T>>,
): FactoryProvider {
  return {
    provide: type,
    useFactory: () => createSpyObject(type, properties),
  };
}
