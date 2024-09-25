// continue in here : https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa/train/typescript

// It is a failure to translate a simple abstract problem of finding the biggest sum of k numbers from a given array not exceeding a threashold t, to a life problem. The first description only drives you away from understanding the simple problem.

// Let's try to learn how to produce permutations with a sample 2 and 3 as this will allow me to understand how to generally create permutations + how work with dynamic combinations

import { assertEqual } from "./helpers/assertEqual";

export function chooseBestSum(
  threashold: number,
  setOfNumbers: number,
  numbers: number[]
): number | null {
  // your code

  // const pairs

  // values

  // get the closest value

  return null;
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
