import { Methods } from '../interfaces/Methods';
import { MetadataKeys } from '../interfaces/MetadataKeys';

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: object, key: string) {
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
