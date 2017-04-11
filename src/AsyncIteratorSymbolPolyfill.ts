// Symbol.asyncIterator must exist at runtime. This polyfills it for older node
// versions.
(Symbol as any).asyncIterator = Symbol.asyncIterator !== undefined
    ? Symbol.asyncIterator
    : '__@@asyncIterator__';
