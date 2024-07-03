// https://www.codewars.com/kata/58905bfa1decb981da00009e

import { runTests } from "./helpers/assertEqual";

type Queues = number[][];

type Lift = {
  currentFloor: number;
  direction: "up" | "down";
  passengers: number[];
  floorsVisited: number[];
  [key: string]: any;
};

let moveLiftFunctionCall: any;

export const theLift = (floorQueues: Queues, capacity: number): number[] => {
  const lift: Lift = {
    currentFloor: 0,
    direction: "up",
    passengers: [],
    floorsVisited: [0],

    iterationLimit: 10, // this is hacky 😊

    liftHasSpace: () => lift.passengers.length < capacity,
    liftIsEmpty: () => lift.passengers.length === 0,
    liftIsFull: () => lift.passengers.length === capacity,
    liftHasPassengers: () => lift.passengers.length > 0,
    buildingHasPeople: () => floorQueues.some((queue) => queue.length > 0),
    flipDirection: () => {
      lift.direction = lift.direction === "up" ? "down" : "up";
    },

    decrementIterationLimit: () => lift.iterationLimit--,

    dropPassengers: () => {
      lift.passengers = lift.passengers.filter(
        (passenger) => passenger !== lift.currentFloor
      );
    },

    pickUpPassengers: () => {
      const currentFloorQueue = floorQueues[lift.currentFloor];

      const passngersGoingInTheSameDirection = currentFloorQueue.filter(
        (passenger) =>
          lift.direction === "up"
            ? passenger > lift.currentFloor
            : passenger < lift.currentFloor
      );
      const availableSpace = capacity - lift.passengers.length;

      if (availableSpace > 0) {
        const passengersToPickUp = passngersGoingInTheSameDirection.slice(
          0,
          availableSpace
        );

        // remove the passengers from the queue
        passengersToPickUp.forEach((passenger) => {
          const index = currentFloorQueue.indexOf(passenger);
          if (index > -1) {
            currentFloorQueue.splice(index, 1);
          }
        });

        lift.passengers = [...lift.passengers, ...passengersToPickUp];
      }
    },

    valuesInDirection: (values: number[]) => {
      return values.filter((value) =>
        lift.direction === "up"
          ? value > lift.currentFloor
          : value < lift.currentFloor
      );
    },

    moveLift: () => {
      let dials = floorQueues
        .map((queue, floorIndex) => {
          return queue.filter((passenger) => {
            return lift.direction === "up"
              ? passenger > floorIndex
              : passenger < floorIndex;
          });
        })
        .map((queue, floorIndex) => {
          const floorHasPassengers = queue.length > 0;
          return floorHasPassengers ? floorIndex : null;
        })
        .filter((floorIndex) => {
          return floorIndex !== null;
        })
        .map((floorIndex) => floorIndex as number) // type fix
        .filter((floorIndex) => {
          return lift.direction === "up"
            ? floorIndex > lift.currentFloor
            : floorIndex < lift.currentFloor;
        }) as number[];

      // if the list is full, ignore the dials
      if (lift.liftIsFull()) {
        dials = [];
      }

      const dialsPlusPassengers = [...dials, ...lift.passengers];

      const optimalStopingFloor =
        dialsPlusPassengers.length > 0
          ? dialsPlusPassengers.reduce((acc, value) => {
              if (lift.direction === "up") {
                if (value < acc) {
                  return value;
                }
              }

              if (lift.direction === "down") {
                if (value > acc) {
                  return value;
                }
              }

              return acc;
            })
          : null;

      let updatedFloor;

      const maxFloorWithPassengers = floorQueues.reduce((max, queue, index) => {
        if (queue.length > 0) {
          return index;
        }

        return max;
      }, 0);

      const maxFloorPassengerValue = Math.max(...floorQueues.flat());
      const finalStop = Math.max(
        maxFloorPassengerValue,
        maxFloorWithPassengers
      );

      const lowestPassengerDrop = Math.min(...lift.passengers);
      const firstFloowWithADialAwaiting = floorQueues.findIndex(
        (queue) => queue.length > 0
      );
      const bottomFloor = Math.min(
        lowestPassengerDrop,
        firstFloowWithADialAwaiting
      );

      const noPassengerAndQueueInDirection =
        lift.passengers.length === 0 && dials.length === 0;

      if (optimalStopingFloor !== null) {
        updatedFloor = optimalStopingFloor;
      } else if (noPassengerAndQueueInDirection) {
        updatedFloor = lift.direction === "up" ? finalStop : bottomFloor;
      }

      if (updatedFloor !== undefined && updatedFloor >= 0) {
        lift.currentFloor = updatedFloor;
        lift.floorsVisited.push(updatedFloor);

        if (updatedFloor === bottomFloor) {
          lift.direction = "up";
        }

        if (updatedFloor === finalStop) {
          lift.direction = "down";
        }
      }

      moveLiftFunctionCall = {
        lift: {
          passengers: lift.passengers,
        },
        dials,
        dialsPlusPassengers,
        optimalStopingFloor,
        updatedFloor,
      };

      // get closest passenger floor
      // get closest dial floor
      // check for calls in the same direction
      // passenger has the priority I think
      // if updated floor position touched the end of the building, flip the direction
    },

    liftProperties() {
      const expected = [+0, 1, 5, 6, 5, 1, +0, 1, +0]; // For debugging purposes
      const florsVisitedAreMatchedSoFar = lift.floorsVisited.every(
        (floor, index) => floor === expected[index]
      );

      return {
        floor: lift.currentFloor,
        direction: lift.direction,
        passengers: lift.passengers,
        floorsVisited: {
          floorsVisited: [...lift.floorsVisited],
          match: florsVisitedAreMatchedSoFar
            ? "✅"
            : `❌, expected ${JSON.stringify(
                expected.slice(0, lift.floorsVisited.length)
              )}`,
        },
        iterationLimit: lift.iterationLimit,
      };
    },
  };

  while (
    (lift.buildingHasPeople() || lift.liftHasPassengers()) &&
    lift.iterationLimit > 0
  ) {
    const beforeState = lift.liftProperties();

    lift.dropPassengers();
    lift.pickUpPassengers();
    lift.moveLift();

    lift.decrementIterationLimit();

    const afterState = lift.liftProperties();

    console.log({ beforeState, moveLiftFunctionCall, afterState, floorQueues });
  }

  // if does not end with 0, add 0
  if (lift.floorsVisited[lift.floorsVisited.length - 1] !== 0) {
    lift.floorsVisited.push(0);
  }

  return lift.floorsVisited;
};

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
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [0], // 1
    //       [], // 2
    //       [], // 3
    //       [2], // 4
    //       [3], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 5, 4, 3, 2, 1, 0],
    // }, //
    // Yo yo case
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [], // 1
    //       [4, 4, 4, 4], // 2
    //       [], // 3
    //       [2, 2, 2, 2], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     2
    //   ),
    //   expected: [0, 2, 4, 2, 4, 2, 0],
    // },
    // expected [ +0, 2, 2, 2, 2, 2, 2, 2, 2, +0 ] to have the same members as [ +0, 2, 4, 2, 4, 2, +0 ]
    // Enter on ground floor case
    // {
    //   actual: theLift(
    //     [
    //       [1, 2, 3, 4], // G
    //       [], // 1
    //       [], // 2
    //       [], // 3
    //       [], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 1, 2, 3, 4, 0],
    // },
    // lift full up
    // {
    //   actual: theLift(
    //     [
    //       [3, 3, 3, 3, 3, 3], // G
    //       // [3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // G
    //       [], // 1
    //       [], // 2
    //       [], // 3
    //       [], // 4
    //       [], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [0, 3, 0, 3, 0],
    // },
    // this one just passed by increainsg the iteration limit
    // {
    //   actual: theLift(
    //     [
    //       [3], // G
    //       [2], // 1
    //       [0], // 2
    //       [2], // 3
    //       [], // 4
    //       [], // 5
    //       [5], // 6
    //     ],
    //     5
    //   ),
    //   expected: [+0, 1, 2, 3, 6, 5, 3, 2, +0],
    // },
    // lift full (up and down)
    // {
    //   actual: theLift(
    //     [
    //       [3, 3, 3, 3, 3, 3], // G
    //       [], // 1
    //       [], // 2
    //       [], // 3
    //       [], // 4
    //       [4, 4, 4, 4, 4, 4], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [+0, 3, 5, 4, +0, 3, 5, 4, +0],
    // },
    // fire drill
    {
      actual: theLift(
        [
          [], // G
          [0, 0, 0, 0], // 1
          [0, 0, 0, 0], // 2
          [0, 0, 0, 0], // 3
          [0, 0, 0, 0], // 4
          [0, 0, 0, 0], // 5
          [0, 0, 0, 0], // 6
        ],
        5
      ),
      expected: [
        0, 6, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 4, 3, 2, 1, 0, 3, 2, 1, 0, 1,
        0,
      ],
    },
    // tricky question
    // {
    //   actual: theLift(
    //     [
    //       [], // G
    //       [0, 0, 0, 6], // 1
    //       [], // 2
    //       [], // 3
    //       [], // 4
    //       [6, 6, 0, 0, 0, 6], // 5
    //       [], // 6
    //     ],
    //     5
    //   ),
    //   expected: [+0, 1, 5, 6, 5, 1, +0, 1, +0],
    // },
  ],
  deep: true,
}); // ?
