// continue in here : https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa/train/typescript

import { assertEqual } from "./helpers/assertEqual";

// It is a failure to translate a simple abstract problem of finding the biggest sum of k numbers from a given array not exceeding a threashold t, to a life problem. The first description only drives you away from understanding the simple problem.

const getPairs = (arr: number[], k: number): number[][] => {
  const n = arr.length;
  const pairs: number[][] = [];

  const dfs = (start: number, path: number[]) => {
    if (path.length === k) {
      pairs.push(path.slice());

      return;
    }
    for (let i = start; i < n; i++) {
      path.push(arr[i]);

      dfs(i + 1, path);

      path.pop();
    }
  };

  dfs(0, []);

  return pairs;
};

export function chooseBestSum(
  threashold: number,
  setOfNumbers: number,
  numbers: number[]
): number | null {
  const pairs = getPairs(numbers, setOfNumbers);

  const pairsSum = pairs.map((pair) =>
    pair.reduce((acc, curr) => acc + curr, 0)
  );

  const sortedPairsSum = [...pairsSum].sort((a, b) => b - a);

  return sortedPairsSum.find((sum) => sum <= threashold) || null;
}

assertEqual({
  actual: chooseBestSum(163, 3, [50, 55, 56, 57, 58]),
  expected: 163,
}); // ?
assertEqual({
  actual: chooseBestSum(163, 3, [50]),
  expected: null,
}); // ?
assertEqual({
  actual: chooseBestSum(230, 3, [91, 74, 73, 85, 73, 81, 87]),
  expected: 228,
}); // ?
