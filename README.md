# iterable-transformers

Type-safe transformer functions for `Iterable` and `AsyncIterable` (`map`, `flatten`, `reduce`, etc.).

This is just a start. I'm looking for contributors :-)

[IxJS] is supposed to solve this problem, but I wanted something I could start using today.

## Transformers

|transformers|`Iterable`|`AsyncIterable`|
|-|-|-|
|`map`|✅|✅|
|`flatten`|✅|✅|
|`reduce`|✅|✅|
|`toArray`|✅|✅|
|`filter`|TODO|TODO|
|`take`|TODO|TODO|
|`takeWhile`|TODO|TODO|
|`takeUntil`|TODO|TODO|
|`drop`|TODO|TODO|
|`dropWhile`|TODO|TODO|
|`dropUntil`|TODO|TODO|

## Development

``` bash
yarn
yarn run lint
yarn run compile
node ./target/Iterable-examples.js
node ./target/AsyncIterable-examples.js
```

## To do

- [ ] Write tests
- [ ] [Fantasy Land] compatibility

[IxJS]: https://github.com/ReactiveX/IxJS
[Fantasy Land]: https://github.com/fantasyland/fantasy-land
