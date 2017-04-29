import { map, flatten, toArray, takeWhile } from '../src/AsyncIterable';

const eg1 = async () => {
    const gen = async function* () {
        yield 10;
        yield 20;
    };

    const a = map((x: number) => x + 1)(gen());
    console.log('map');
    for await (const y of a) {
        console.log(y);
    }
};

const eg2 = async () => {
    const innerGen = async function* () {
        yield 10;
        yield 20;
    };
    const gen = async function* () {
        yield innerGen();
        yield innerGen();
    };

    // https://github.com/Microsoft/TypeScript/issues/15143
    const a = flatten(gen());
    const b = map((x: number) => x + 1)(a);
    console.log('flatten, map');
    for await (const y of b) {
        console.log(y);
    }
};

const eg3 = async () => {
    const gen = async function* () {
        yield 10;
        yield 20;
    };

    const a = gen();
    console.log('toArray');
    return toArray(a).then(console.log);
};

const eg4 = async () => {
    const gen = async function* () {
        yield 10;
        yield 20;
    };

    const a = gen();
    console.log('takeWhile');
    const b = takeWhile((t: number) => t <= 10)(a);
    for await (const y of b) {
        console.log(y);
    }
};

const egs = [
    eg1,
    eg2,
    eg3,
    eg4,
];

const sequencePromiseFns = (fns: Array<() => Promise<any>>) => (
    fns.reduce((acc, fn) => acc.then(fn), Promise.resolve())
);

sequencePromiseFns(egs);
