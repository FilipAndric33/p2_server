import { methods, metadataKeys } from '../interfaces';

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: object, key: string) {
      Reflect.defineMetadata(metadataKeys.method, method, target, key);
      Reflect.defineMetadata(metadataKeys.path, path, target, key);
    };
  };
}

export const get = routeBinder(methods.get);
export const post = routeBinder(methods.post);
export const put = routeBinder(methods.put);
export const del = routeBinder(methods.del);
