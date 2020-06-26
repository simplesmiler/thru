# @simplesmiler/thru
[![Version](https://img.shields.io/npm/v/@simplesmiler/thru.svg)](https://www.npmjs.com/package/@simplesmiler/thru)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/simplesmiler/thru#readme)

> Type-safe operator for chaining

- Allows function calls to follow the data flow instead of being nested
- Does not require pre-chain wrapping and post-chain unwrapping
- Does not require explicit-er types than usual
- Promotes code minification due to tree shaking and name mangling

Inspired by:
  - Lodash.thru: https://lodash.com/docs/
  - Bind operator proposal: https://github.com/tc39/proposal-bind-operator
  - Pipeline operator proposal: https://github.com/tc39/proposal-pipeline-operator
  - Do notation from Haskell: https://en.wikibooks.org/wiki/Haskell/do_notation
  - Discussion over at https://esdiscuss.org/topic/array-prototype-tap

## Install

```sh
npm install @simplesmiler/thru
```

## Use

```js
import { thru, tap } from '@simplesmiler/thru';
import { flatten } from 'lodash/fp';

const result = [1, 2, 3]
  .map((x) => [x, x * 2])
  [thru](flatten)
  [thru]((list) => list.slice().sort((a, b) => a - b))
  [tap]((sorted) => console.log('DEBUG:', sorted)) 
  .join(', ')
  [thru]((text) => `Computed numbers: ${text}`);
```

## License

Copyright © 2020 [Denis Karabaza <denis.karabaza@gmail.com>](https://github.com/simplesmiler).

This project is ISC licensed.
