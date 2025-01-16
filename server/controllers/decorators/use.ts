import 'reflect-metadata';
import { RequestHandler } from 'express';
import { metadataKeys } from '../../interfaces';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    const middlewares =
      Reflect.getMetadata(metadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      metadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key,
    );
  };
}
