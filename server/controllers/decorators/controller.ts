import 'reflect-metadata';
import { MetadataKeys } from '../../interfaces/MetadataKeys';
import { AppRouter } from '../../routes/AppRouter';
import { Methods } from '../../interfaces/Methods';

export function controller(prefix: string) {
  return function (target: Function) {
    const properties = Object.getOwnPropertyNames(target.prototype);

    for (let key of properties) {
      const router = AppRouter.getInstance();
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key,
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key,
      );
      const routeHandler = target.prototype[key];
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      if (path) {
        router[method](`${prefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
