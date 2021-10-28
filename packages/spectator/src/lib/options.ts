import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { OptionalsRequired } from './types';
import { merge } from './internal/merge';

export interface BaseSpectatorModuleMetadata<T, A> extends ModuleMetadata {
  mocks?: Type<T, A>[];
}

function defaultOptions<T, A>(): OptionalsRequired<
  BaseSpectatorModuleMetadata<T, A>
> {
  return {
    imports: [],
    controllers: [],
    providers: [],
    exports: [],
    mocks: [],
  };
}
// const defaultOptions: OptionalsRequired<BaseSpectatorModuleMetadata<T, A>> = {
//   imports: [],
//   controllers: [],
//   providers: [],
//   exports: [],
//   mocks: [],
// };

/**
 * @internal
 */
export function getSpectatorDefaultOptions<T, A>(
  overrides?: BaseSpectatorModuleMetadata<T, A>,
): Required<BaseSpectatorModuleMetadata<T, A>> {
  return merge(defaultOptions<T, A>(), overrides);
}
