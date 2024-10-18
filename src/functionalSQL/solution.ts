/*
🖋️ Cases to handle:
- groupBy add support for multiple levels of grouping ❌
- Add having method ❌
- Add orderBy method ❌
- From method support multiple source of information ❌ (this query looks potentially a bit complicated)
- Also, it looks like where and having have some advanced query case❌
*/

// Create a helper to reset groupBy structure entirerly like in the example ❌

import { assertDeepEqual } from "../helpers/assertEqual";

// Grouping implemented, ✅
// Multi level grouping, ✅

type Operation = {
  name: string;
  fn: (...args: any[]) => void;
  args: any[];
};

class GroupBy {
  private data: any[];

  constructor(data: any[]) {
    this.data = data; // Initialize the class with the data
  }

  // GroupBy method that only takes the fields and uses the class's internal data
  groupBy(...functionFields: any[]): any {
    // Base case: if no fields are provided, return the original data
    if (functionFields.length === 0) return this.data;

    // Group data by the current field
    const functionField = functionFields[0]; // Take the first field

    const groupedData: {
      [key: string]: any;
    } = {};

    this.data.forEach((item: any) => {
      // * A little bit of hack to extract the function filtering key (maybe not)
      const key = item[functionField.name]; // 🗝 Get the value of the field (e.g., profession)

      if (!groupedData[key]) groupedData[key] = []; // Initialize an empty array for the group

      groupedData[key].push(item); // Push the item into the group
    });

    // ♾ Recursively group the inner data by remaining fields
    for (let key in groupedData) {
      const subgroup = new GroupBy(groupedData[key]); // Create a new instance for recursion
      groupedData[key] = subgroup.groupBy(...functionFields.slice(1));
    }

    return groupedData;
  }
}

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
    const groupBy = new GroupBy(this.result).groupBy(...args);

    this.result = groupBy;
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

const actual = query()
  .select()
  .from(persons)
  .groupBy(profession, name)
  .execute();

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
