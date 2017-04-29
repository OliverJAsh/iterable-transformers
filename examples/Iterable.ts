import { map, flatten, toArray, takeWhile } from '../src/Iterable';

const eg1 = () => {
    const gen = function* () {
        yield 10;
        yield 20;
    };

    map((x: number) => x + 1)(gen());

    const a = map((x: number) => x + 1)(gen());
    console.log('map');
    for (const y of a) {
        console.log(y);
    }
};

const eg2 = () => {
    const innerGen = function* () {
        yield 10;
        yield 20;
    };
    const gen = function* () {
        yield innerGen();
        yield innerGen();
    };

    const a = flatten(gen());
    const b = map((x: number) => x + 1)(a);
    console.log('flatten, map');
    for (const y of b) {
        console.log(y);
    }
};

const eg3 = async () => {
    const gen = function* () {
        yield 10;
        yield 20;
    };

    const a = gen();
    console.log('toArray');
    console.log(toArray(a));
};

const eg4 = async () => {
    const gen = function* () {
        yield 10;
        yield 20;
    };

    const a = gen();
    console.log('takeWhile');
    const b = takeWhile((t: number) => t <= 10)(a);
    for (const y of b) {
        console.log(y);
    }
};

const egs = [
    eg1,
    eg2,
    eg3,
    eg4,
];

egs.forEach(eg => eg());
