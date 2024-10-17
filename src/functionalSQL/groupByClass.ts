/*

TODO:
1) Create a helper to reset structure differently ❌
2) Update data structure to the one from the test case ✅
3) Attributes are passed as strings, when they should be functions ❌
(Look up whether it has any importance)

*/

import { assertDeepEqual } from "../helpers/assertEqual";

class GroupByClass {
  private data: any[];

  constructor(data: any[]) {
    this.data = data; // Initialize the class with the data
  }

  // GroupBy method that only takes the fields and uses the class's internal data
  groupBy(...fields: any[]): any {
    // Base case: if no fields are provided, return the original data
    if (fields.length === 0) return this.data;

    // Group data by the current field
    const field = fields[0]; // Take the first field
    const groupedData: {
      [key: string]: any;
    } = {};

    this.data.forEach((item: any) => {
      const key = item[field]; // Get the value of the field (e.g., profession)
      if (!groupedData[key]) {
        groupedData[key] = []; // Initialize an empty array for the group
      }
      groupedData[key].push(item); // Push the item into the group
    });

    // Recursively group the inner data by remaining fields
    for (let key in groupedData) {
      const subgroup = new GroupByClass(groupedData[key]); // Create a new instance for recursion
      groupedData[key] = subgroup.groupBy(...fields.slice(1));
    }

    return groupedData;
  }
}

var persons = [
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Michael",
    profession: "teacher",
    age: 50,
    maritalStatus: "single",
  },
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Rose",
    profession: "scientific",
    age: 50,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "single",
  },
  {
    name: "Anna",
    profession: "politician",
    age: 50,
    maritalStatus: "married",
  },
];

const actual = new GroupByClass(persons).groupBy("profession", "name");

const expected = [
  [
    "teacher",
    [
      [
        "Peter",
        [
          {
            name: "Peter",
            profession: "teacher",
            age: 20,
            maritalStatus: "married",
          },
          {
            name: "Peter",
            profession: "teacher",
            age: 20,
            maritalStatus: "married",
          },
        ],
      ],
      [
        "Michael",
        [
          {
            name: "Michael",
            profession: "teacher",
            age: 50,
            maritalStatus: "single",
          },
        ],
      ],
    ],
  ],
  [
    "scientific",
    [
      [
        "Anna",
        [
          {
            name: "Anna",
            profession: "scientific",
            age: 20,
            maritalStatus: "married",
          },
          {
            name: "Anna",
            profession: "scientific",
            age: 20,
            maritalStatus: "single",
          },
        ],
      ],
      [
        "Rose",
        [
          {
            name: "Rose",
            profession: "scientific",
            age: 50,
            maritalStatus: "married",
          },
        ],
      ],
    ],
  ],
  [
    "politician",
    [
      [
        "Anna",
        [
          {
            name: "Anna",
            profession: "politician",
            age: 50,
            maritalStatus: "married",
          },
        ],
      ],
    ],
  ],
];

console.log({
  actual,
  expected,
}); // ?

// assertDeepEqual({ actual, expected }); // ?

// function profession(person: any) {
//   return person.profession;
// }

// function name(person: any) {
//   return person.name;
// }
