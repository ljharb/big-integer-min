var test = require('tap').test;
var bigIntMin = require('./index.js');

test('requires a string', function (t) {
	var error = new TypeError('both arguments must be strings');
	t.throws(function () { bigIntMin('', 1); }, error, 'throws on first non-string arg');
	t.throws(function () { bigIntMin(1, ''); }, error, 'throws on second non-string arg');
	t.end();
});

test('requires a valid integer', function (t) {
	var error = new TypeError('both strings must be valid positive, negative, or zero integers');
	t.throws(function () { bigIntMin('', '123a'); }, error, 'requires only digits');
	t.throws(function () { bigIntMin('', '123.3'); }, error, 'requires only digits');
	t.end();
});

test('does not allow leading zeroes', function (t) {
	var error = new TypeError('both strings must have no leading zeroes');
	t.throws(function () { bigIntMin('123', '001'); }, error, 'does not allow leading zeroes');
	t.end();
});

test('works', function (t) {
	t.equal(bigIntMin('1', '2'), '1', 'works with single digits');
	t.equal(bigIntMin('-1', '2'), '-1', 'works with positive and negative number');
	t.equal(bigIntMin('10', '100'), '10', 'works with numbers of different lengths');
	t.equal(bigIntMin('0', '3'), '0', 'works with zero');
	t.equal(bigIntMin('123', '123'), '123', 'works with the same value');

	var reallyBigInteger = '179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368';
	t.equal(bigIntMin(reallyBigInteger, '0'), '0', 'works with a really big integer');
	t.equal(bigIntMin('-' + reallyBigInteger, '0'), '-' + reallyBigInteger, 'works with a really small integer');

	var reallySmallNumber = '-1' + String(Math.pow(2, 53));
	var muchSmallerNumber = '-9' + String(Math.pow(2, 53));
	t.equal(bigIntMin(reallySmallNumber, muchSmallerNumber), muchSmallerNumber, 'works with numbers too large for JS to support');
	t.end();
});

test('is sync without a callback', function (t) {
	t.equal(bigIntMin('1', '2'), '1', 'returns a value');
	t.end();
});

test('is async with a callback', function (t) {
	t.plan(2);
	bigIntMin('123', '123456789', function (error, min) {
		t.equal(error, null, 'error is null');
		t.equal(min, '123', 'passes the value to the callback');
		t.end();
	});
});

