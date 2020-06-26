import test from 'tape';
import { thru, tap } from '../src';
import { flatten } from 'lodash/fp';

test('thru iteration', function (t) {
  t.plan(2);

  const result1 = [1, 2, 3]
    .map((x) => [x, x * 2]) // @NOTE: Native array chaining
    [thru](flatten) // @NOTE: Then with a library function
    [thru]((list) => list.slice().sort((a, b) => a - b)); // @NOTE: And back to a native operation on the whole list

  const result2 = flatten([1, 2, 3].map((x) => [x, x * 2]))
    .slice()
    .sort((a, b) => a - b);

  t.deepEqual(result1, [1, 2, 2, 3, 4, 6]);
  t.deepEqual(result1, result2);
});

test('thru string', function (t) {
  t.plan(2);

  function doubleSay(str: string): string {
    return str + ', ' + str;
  }

  function capitalize(str: string): string {
    return str[0].toUpperCase() + str.substring(1);
  }

  function exclaim(str: string): string {
    return str + '!';
  }

  const result1 = 'hello'[thru](doubleSay)[thru](capitalize)[thru](exclaim);

  const result2 = exclaim(capitalize(doubleSay('hello')));

  t.equal(result1, 'Hello, hello!');
  t.equal(result1, result2);
});

test('tap', function (t) {
  t.plan(2);

  const log: number[][] = [];

  const result = [1, 2, 3]
    [tap]((list) => log.push(list))
    .map((x) => x * 2)
    [tap]((list) => log.push(list));

  t.deepEqual(result, [2, 4, 6]);
  t.deepEqual(log, [
    [1, 2, 3],
    [2, 4, 6],
  ]);
});
