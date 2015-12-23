# catalytic - a module for your unit conversion needs [![Build Status](https://travis-ci.org/goodeggs/catalytic.svg?branch=master)](https://travis-ci.org/goodeggs/catalytic)

## Features

- Simple, easily understood API
- Convert to and from arbitrary units
- Uses [BigNumber](http://mikemcl.github.io/bignumber.js) for math: avoiding inexplicable floating-point math errors
- Does not come with awareness of anything by default, you have to teach it whatever conversions you care about

## Examples

```javascript
var catalytic = require('catalytic')

var converter = catalytic.converter({
  baseUnitName: 'lb',
  types: [
    {id: 'id1', name: 'case (50lb)', qty: 50},
    {id: 'id2', name: 'porterhouse (1.5lb)', qty: 1.5},
    {id: 'id3', name: 'porterhouse (2lb)', qty: 2}
  ]
})

converter.convertTo(100, 'id1') // => 2
converter.convertTo(90, 'id1')  // => 1.8
converter.strConvertTo(100, 'id1') // => "2 x case (50lb)"

converter.convertFrom(2, 'id1') // => 100
converter.strConvertFrom(5, 'id1') // "250 x lb"
```

If you're converting from/to undefined, we assume you're converting from/to the
base unit (ie, not changing anything):

```javascript
converter.convertTo(100) // => 100
converter.strConvertTo(100) // => "100 x lb"

converter.convertFrom(10) // => 10
converter.strConvertFrom(10) // => "10 x lb"
```

There's also some basic methods for easy conversion without an object:

```javascript
catalytic.convertToUnitQty({count: 5, unitQty: 10}) // => 50
catalytic.convertFromUnitQty({count: 50, unitQty: 10}) // => 5
```

## Contributing

This module is written in ES2015 and converted to node-friendly CommonJS via
[Babel](http://babeljs.io/). Tests are run with [mocha](https://mochajs.org).

If you're going to add a PR, please write a test too. They live in the `test`
directory. To run all tests:

```
npm test
```

To compile the `src` directory to `lib`:

```
npm run build
```
