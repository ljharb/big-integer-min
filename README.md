# big-integer-min <sup>[![Version Badge][npm-version-svg]][npm-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][npm-url]

[![browser support][testling-png]][testling-url]

Given two valid integers in string form, return the smaller of the two.

## Example

```js
var bigIntegerMin = require('big-integer-min');
var assert = require('assert');
var reallyBigInteger = '179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368';

// sync
assert.equal(bigIntegerMin('1', '2'), '1');
assert.equal(bigIntegerMin('-1', '2'), '-1');
assert.equal(bigIntegerMin('1', reallyBigInteger), '1');

// async
bigIntegerMin('1', '2', function (error, min) {
	assert.equal(error, null); // this should never have an error
	assert.equal(min, '1');
});
```

## Tests
Simply clone the repo, run `npm install`, and then run `npm test`.

[npm-url]: https://npmjs.org/package/big-integer-min
[npm-version-svg]: http://versionbadg.es/ljharb/big-integer-min.svg
[travis-svg]: https://travis-ci.org/ljharb/big-integer-min.svg
[travis-url]: https://travis-ci.org/ljharb/big-integer-min
[deps-svg]: https://david-dm.org/ljharb/big-integer-min.svg
[deps-url]: https://david-dm.org/ljharb/big-integer-min
[dev-deps-svg]: https://david-dm.org/ljharb/big-integer-min/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/big-integer-min#info=devDependencies
[testling-png]: https://ci.testling.com/ljharb/big-integer-min.png
[testling-url]: https://ci.testling.com/ljharb/big-integer-min
[11]: https://nodei.co/npm/big-integer-min.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/big-integer-min.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/big-integer-min.svg
[downloads-url]: http://npm-stat.com/charts.html?package=big-integer-min

