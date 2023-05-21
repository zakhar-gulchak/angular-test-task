import { defer } from "rxjs";

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
