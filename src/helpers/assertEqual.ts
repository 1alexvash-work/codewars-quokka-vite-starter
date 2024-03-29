type AssertEqual = {
  actual: any;
  expected: any;
};

export const assertEqual = ({ actual, expected }: AssertEqual) => {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    return `✅ ${actual} === ${expected}`;
  } else {
    return `❌ ${actual} !== ${expected}`;
  }
};
