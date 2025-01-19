import 'reflect-metadata';
import { metadataKeys, methods } from '../../interfaces';
import { AppRouter } from '../../routes/AppRouter';

export function controller(prefix: string) {
  return function (target: Function) {
    const properties = Object.getOwnPropertyNames(target.prototype);

    for (let key of properties) {
      const router = AppRouter.getInstance();
      const path = Reflect.getMetadata(
        metadataKeys.path,
        target.prototype,
        key,
      );
      const method: methods = Reflect.getMetadata(
        metadataKeys.method,
        target.prototype,
        key,
      );
      const routeHandler = target.prototype[key];
      const middlewares =
        Reflect.getMetadata(metadataKeys.middleware, target.prototype, key) ||
        [];

      if (path) {
        router[method](`${prefix}${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
