/*
🖋️ Cases to handle:
- groupBy add support for multiple levels of grouping ✅
- Add having method ❌
- Add orderBy method ✅
- From method support multiple source of information ❌ (this query looks potentially a bit complicated)
- Also, it looks like where and having have some advanced query case❌
*/

import { assertDeepEqual } from "../helpers/assertEqual";

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
      const key = functionField(item); // 🗝 Get the value of the field (e.g., profession)

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

const convertToObjectEntries = (object: any): any => {
  return Object.entries(object).map(([key, value]: any) => {
    const keyIsNumber = !isNaN(Number(key));

    if (keyIsNumber) key = Number(key);

    if (typeof value === "object" && !Array.isArray(value)) {
      return [key, convertToObjectEntries(value)];
    }

    return [key, value];
  });
};

export class Query {
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

  where(...args: any) {
    this.operations.push({
      name: "2",
      fn: () => this.whereReal(...args),
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
    this.result = [...array];
  }

  whereReal(...whereFunction: any) {
    if (whereFunction === undefined) {
      return;
    }

    const result: any = [];

    whereFunction.forEach((fn: any) => {
      result.push(...this.result.filter(fn));
    });

    this.result = result;
  }

  groupByReal(args: any) {
    const groupBy = new GroupBy(this.result).groupBy(...args);

    this.result = convertToObjectEntries(groupBy);
  }

  havingReal(args: any) {
    if (args === undefined) {
      return;
    }

    this.result = this.result.filter(args);
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
      this.result = this.result.map((group: any) => selectFunction(group));
    } else {
      this.result = this.result.map(selectFunction);
    }
  }

  orderByReal(args: any) {
    this.result = this.result.sort(args);
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

///////////////////////////////////////// TESTS ⬇⬇⬇
