// @ts-expect-error
import { register } from 'node:module';
// console.log(register);
register('ts-node/esm', import.meta.url);
