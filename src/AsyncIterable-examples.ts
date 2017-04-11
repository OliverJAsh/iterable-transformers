import { map, flatten, toArray } from './AsyncIterable';

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
    toArray(a).then(console.log);
};

const egs = [
    eg1,
    eg2,
    eg3,
];

const sequencePromiseFns = (fns: Array<() => Promise<any>>) => (
    fns.reduce((acc, fn) => acc.then(fn), Promise.resolve())
);

sequencePromiseFns(egs);
