export const map = <TSource, TResult>(
    fn: (value: TSource) => TResult,
) => function* (
    source: Iterable<TSource>,
) {
    for (const value of source) {
        yield fn(value);
    }
};

export const flatten = function* <TSource>(
    source: Iterable<Iterable<TSource>>,
) {
    for (const value of source) {
        yield* value;
    }
};

type Reducer<Acc, TSource> = (acc: Acc, t: TSource) => Acc;
export const reduce = <Acc, TSource>(
    reducer: Reducer<Acc, TSource>,
) => (
    initialValue: Acc,
) => (
    source: Iterable<TSource>,
) => {
    const iterator = source[Symbol.iterator]();

    const recurse = (iterator: Iterator<TSource>, acc: Acc): Acc => {
        const iteratorResult = iterator.next();
        if (iteratorResult.done) {
            return acc;
        } else {
            const { value } = iteratorResult;
            const nextAcc = reducer(acc, value);
            return recurse(iterator, nextAcc);
        }
    };

    return recurse(iterator, initialValue);
};

// TODO: Delegate to Array.from instead?
export const toArray = <TSource>(
    source: Iterable<TSource>,
) => {
    type Acc = TSource[];
    const reducer: Reducer<Acc, TSource> = (acc, t) => {
        acc.push(t);
        return acc;
    };
    return reduce(reducer)([])(source);
};
