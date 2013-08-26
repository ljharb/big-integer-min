var nextTick = (function (undef) {
	var p = typeof process === 'undefined' ? process : {};
	var setI = typeof setImmediate !== 'undefined' ? setImmediate : undef;
	return p.nextTick || setI || function setTimeoutZero(cb) { return setTimeout(cb, 0); };
}());

var toString = Object.prototype.toString;

var isFunction = function (value) {
	var isAlert = typeof window !== 'undefined' && value === window.alert;
	return isAlert || '[object Function]' === toString.call(value);
};

/* Big Integer Minimum
 *
 * Pass in two strings that are otherwise valid integers, positive or negative.
 * No leading zeroes.
 */

var digits = /^\-?[0-9]+$/;
var leadingZeroes = /^\-?0+[^0]+$/;

var bigIntegerMin = function bigIntegerMinimum(numberA, numberB) {
	var bothNegative = false;
	var smallest = numberA;
	if (numberA.charAt(0) === '-' && numberB.charAt(0) === '-') {
		numberA = numberA.slice(1);
		numberB = numberB.slice(1);
		bothNegative = true;
	}
	if (numberA !== numberB) {
		var lengthA = numberA.length;
		var lengthB = numberB.length;
		if (numberA.charAt(0) === '-' || numberB.charAt(0) === '-') {
			// signs are different
			if (numberB.charAt(0) === '-') {
				smallest = numberB;
			}
		} else if (bothNegative && lengthA < lengthB) {
			// negative number with the most digits is smallest
			smallest = numberB;
		} else if (!bothNegative && lengthA > lengthB) {
			// positive number with the least digits is smallest
			smallest = numberB;
		} else if (bothNegative) {
			// lengths are the same; both negative
			smallest = numberA < numberB ? numberB : numberA;
		} else {
			// lengths are the same; both positive
			smallest = numberA < numberB ? numberA : numberB;
		}
		if (bothNegative) {
			smallest = '-' + smallest;
		}
	}
	return smallest;
};

var bigIntegerMinDispatcher = function (numberA, numberB, callback) {
	if (typeof numberA !== 'string' || typeof numberB !== 'string') {
		throw new TypeError('both arguments must be strings');
	} else if (!digits.test(numberA) || !digits.test(numberB)) {
		throw new TypeError('both strings must be valid positive, negative, or zero integers');
	} else if (leadingZeroes.test(numberA) || leadingZeroes.test(numberB)) {
		throw new TypeError('both strings must have no leading zeroes');
	}

	if (isFunction(callback)) {
		nextTick(function () {
			callback(null, bigIntegerMin(numberA, numberB));
		});
	} else {
		return bigIntegerMin(numberA, numberB);
	}
};
bigIntegerMinDispatcher.method = bigIntegerMin;

module.exports = bigIntegerMinDispatcher;

