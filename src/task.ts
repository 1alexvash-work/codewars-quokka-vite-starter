// https://www.codewars.com/kata/58905bfa1decb981da00009e

import { runTests } from "./helpers/assertEqual";

type Queues = number[][];

export const theLift = (queues: Queues, capacity: number): number[] => {};

// TODO: DO NOT PICK UP PASSENGERS UNLESS THEY ARE IN THE SAME DIRECTION
// The Lift never changes direction until there are no more people wanting to get on/off in the direction it is already travelling

runTests({
  tests: [
    // {
    //   // up
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [], // 1
    //       [5, 5, 5], // 2
    //       [], // 3
    //       [], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 2, 5, 0],
    // },
    // down
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [], // 1
    //       [1, 1], // 2
    //       [], // 3
    //       [], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 2, 1, 0],
    // },
    // up and up
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [3], // 1
    //       [4], // 2
    //       [], // 3
    //       [5], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 1, 2, 3, 4, 5, 0],
    // }, // ?
    // down and down
    {
      actual: theLift(
        [
          [], // G
          [0], // 1
          [], // 2
          [], // 3
          [2], // 4
          [3], // 5
          [], // 6
        ],
        5
      ),
      expected: [0, 5, 4, 3, 2, 1, 0],
    }, // ?
  ],
  deep: true,
}); // ?
