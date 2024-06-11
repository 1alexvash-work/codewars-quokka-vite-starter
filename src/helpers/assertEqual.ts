type AssertEqual = {
  actual: any;
  expected: any;
};

export const assertEqual = ({ actual, expected }: AssertEqual) => {
  if (actual === expected) {
    return `✅ ${actual} === ${expected}`;
  } else {
    return `❌ Failed: Expected ${expected}, but got ${actual}`;
  }
};

export const assertDeepEqual = ({ actual, expected }: AssertEqual) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return `✅ ${actual} === ${expected}`;
  } else {
    return `❌ Failed: Expected ${expected}, but got ${actual}`;
  }
};

type RunTests = {
  tests: any[];
  deep?: boolean;
};

export const runTests = ({ tests = [], deep = false }: RunTests) => {
  const assert = deep ? assertDeepEqual : assertEqual;
  return tests.map((test) => assert(test));
};
