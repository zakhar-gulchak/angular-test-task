import { defer } from "rxjs";

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
