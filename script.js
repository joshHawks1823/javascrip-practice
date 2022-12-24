// Testing Framework

function describe(testSuiteName, func) {
  console.log(`beginning test suite ${testSuiteName}`);

  try {
    func();
    console.log(`successfully completed test suite ${testSuiteName}`);
  } catch (error) {
    const { testCaseName, errorMessage } = error;
    console.error(
      `failed running test suite ${testSuiteName} on ` +
        `test case ${testCaseName} with error message ${errorMessage}`
    );
  }
}

function it(testCaseName, func) {
  console.log(`beginning test case ${testCaseName}`);

  try {
    func();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (errorMessage) {
    throw { testCaseName, errorMessage };
  }
}

function expect(actual) {
  return new ExpectFunctions(actual);
}

function ExpectFunctions(actual) {
  this.actual = actual;
  this.stringifiedActual = JSON.stringify(actual);
}

ExpectFunctions.prototype.toExist = function () {
  if (this.actual == null) {
    throw `expected value to exist but got ${this.stringifiedActual}`;
  }
};

ExpectFunctions.prototype.toBe = function (expected) {
  if (this.actual !== expected) {
    throw `expected ${this.stringifiedActual} to be ${JSON.stringify(
      expected
    )}`;
  }
};

ExpectFunctions.prototype.toBeType = function (type) {
  if (typeof this.actual !== type) {
    throw `expected ${
      this.stringifiedActual
    } to be of type ${type} but got ${typeof this.actual}`;
  }
};

exports.describe = describe;
exports.it = it;
exports.expect = expect;

// Multiple Array Methods

Array.prototype.myMap = function (callback) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback(this[i], i, this));
  }
  return output;
};

Array.prototype.myFilter = function (callback) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === true) {
      output.push(this[i]);
    }
  }
  return output;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    if (i === 0 && initialValue === undefined) {
      accumulator = this[i];
    } else {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};
