import './AsyncIteratorSymbolPolyfill';

export const map = <TSource, TResult>(
    fn: (value: TSource) => TResult,
) => async function* (
    source: AsyncIterable<TSource>,
): AsyncIterable<TResult> {
    for await (const value of source) {
        yield fn(value);
    }
};

export const flatten = async function* <TSource>(
    source: AsyncIterable<AsyncIterable<TSource>>,
): AsyncIterable<TSource> {
    for await (const value of source) {
        yield* value;
    }
};

type Reducer<Acc, TSource> = (acc: Acc, t: TSource) => Acc;
export const reduce = <Acc, TSource>(
    reducer: Reducer<Acc, TSource>,
) => (
    initialValue: Acc,
) => async (
    source: AsyncIterable<TSource>,
): Promise<Acc> => {
    const iterator = source[Symbol.asyncIterator]();

    const recurse = async (iterator: AsyncIterator<TSource>, acc: Acc): Promise<Acc> => {
        const iteratorResult = await iterator.next();
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

export const toArray = async <TSource>(
    source: AsyncIterable<TSource>,
): Promise<TSource[]> => {
    type Acc = TSource[];
    const reducer: Reducer<Acc, TSource> = (acc, t) => {
        acc.push(t);
        return acc;
    };
    return reduce(reducer)([])(source);
};

export const takeWhile = <TSource>(
    predicate: (t: TSource) => boolean,
) => async function* (
    source: AsyncIterable<TSource>,
): AsyncIterable<TSource> {
    for await (const value of source) {
        if (!predicate(value)) { break; }
        yield value;
    }
};
