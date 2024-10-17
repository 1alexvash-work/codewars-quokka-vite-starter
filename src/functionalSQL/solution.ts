/*
🖋️ Cases to handle:
- groupBy add support for multiple levels of grouping ❌
- Add having method ❌
- Add orderBy method ❌
- From method support multiple source of information ❌ (this query looks potentially a bit complicated)
- Also, it looks like where and having have some advanced query case❌
*/

import { assertDeepEqual } from "../helpers/assertEqual";

// Grouping implemented, yes
// Multi level grouping, no

type Operation = {
  name: string;
  fn: (...args: any[]) => void;
  args: any[];
};

class Query {
  operations: Operation[] = [];
  result: any = [];

  from(array: any[]) {
    this.operations.push({
      name: "1",
      fn: () => this.fromReal(array),
      args: array,
    });

    return this;
  }

  where(args: any) {
    this.operations.push({
      name: "2",
      fn: () => this.whereReal(args),
      args,
    });

    return this;
  }

  groupBy(...args: any) {
    this.operations.push({
      name: "3",
      fn: () => this.groupByReal(args),
      args,
    });

    return this;
  }

  having(args: any) {
    this.operations.push({
      name: "4",
      fn: () => this.havingReal(args),
      args,
    });

    return this;
  }

  select(args?: any) {
    this.operations.push({
      name: "5",
      fn: () => this.selectReal(args),
      args,
    });

    return this;
  }

  orderBy(args: any) {
    this.operations.push({
      name: "6",
      fn: () => this.orderByReal(args),
      args,
    });

    return this;
  }

  fromReal(array: number[]) {
    this.result = array;
  }

  whereReal(whereFunction: any) {
    if (whereFunction === undefined) {
      return;
    }

    this.result = this.result.filter(whereFunction);
  }

  groupByReal(args: any) {
    if (args === undefined) {
      return;
    }

    this.result = this.result.reduce((acc: any, item: any) => {
      const key = args(item);
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});

    const groups = Object.entries(this.result).map(([key, value]) => [
      key,
      value,
    ]);

    this.result = groups;
  }

  havingReal(args: any) {
    console.log("havingReal", args);
  }

  // TODO: it looks like selectReal works differently when it is followed by groupByReal
  selectReal(selectFunction: any) {
    if (selectFunction === undefined) {
      return;
    }

    const queryContaintsGroupBy = this.operations.some(
      (operation) => operation.name === "3"
    );

    if (queryContaintsGroupBy) {
      // something

      console.log("Do something about it");
    } else {
    this.result = this.result.map(selectFunction);
    }
  }

  orderByReal(args: any) {
    console.log("orderByReal", args);
  }

  execute() {
    const fromOperations = this.operations.filter(
      (operation) => operation.name === "1"
    );

    const whereOperations = this.operations.filter(
      (operation) => operation.name === "2"
    );

    const selectOperations = this.operations.filter(
      (operation) => operation.name === "3"
    );

    const groupByOperations = this.operations.filter(
      (operation) => operation.name === "4"
    );

    const havingOperations = this.operations.filter(
      (operation) => operation.name === "5"
    );

    const orderByOperations = this.operations.filter(
      (operation) => operation.name === "6"
    );

    const allOperations = [
      ...fromOperations,
      ...whereOperations,
      ...selectOperations,
      ...groupByOperations,
      ...havingOperations,
      ...orderByOperations,
    ];

    allOperations.forEach(({ fn }) => fn());

    console.log("actual result", this.result);

    return this.result;
  }
}
const queryWrapper = () => new Query();
export const query = queryWrapper;

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

console.log("expected:", expected);

assertDeepEqual({
  actual: query().select().from(persons).groupBy(profession, name).execute(),
  expected,
}); // ?

function profession(person: any) {
  return person.profession;
}

function name(person: any) {
  return person.name;
}
