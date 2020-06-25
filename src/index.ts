// @DOC: Thru is a type-safe operator for lodash-style chaining without wrappers
//       It does part of the job that proposed bind and pipeline operators do,
//       but does not require extension of the language, albeit at the cost of slightly longer code.
//       Inspired by:
//         - Lodash.thru: https://lodash.com/docs/
//         - Bind operator proposal: https://github.com/tc39/proposal-bind-operator
//         - Pipeline operator proposal: https://github.com/tc39/proposal-pipeline-operator
//         - Do notation from Haskell: https://en.wikibooks.org/wiki/Haskell/do_notation
//         - Discussion over at https://esdiscuss.org/topic/array-prototype-tap
//       Benefits:
//         - Allows function calls to follow the data flow instead of being nested
//         - Does not require pre-chaining wrapping and post-chaining unwrapping (as opposed to _.chain + _.value)
//         - Does not require explicit-er types than usual (as opposed to _.flow)
//         - Promotes code minification due to tree shaking and name mangling
//       Limitations:
//         - Thru can not be applied to null and undefined
//         - Thru can not be applied to number literals

export const thru = Symbol('thru');

declare global {
  interface Object {
    [thru]<I, O>(this: I, fn: (self: I) => O): O;
  }
}

Object.defineProperty(Object.prototype, thru, {
  value: function <I, O>(this: I, fn: (self: I) => O): O {
    return fn(this);
  },
});

// @DOC: Tap is like thru, but it ignores the return value. Useful for debugging and side effects.

export const tap = Symbol('tap');

declare global {
  interface Object {
    [tap]<I>(this: I, fn: (self: I) => void): I;
  }
}

Object.defineProperty(Object.prototype, tap, {
  value: function <I, O>(this: I, fn: (self: I) => void): I {
    fn(this);
    return this;
  },
});
