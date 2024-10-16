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

  selectReal(selectFunction: any) {
    if (selectFunction === undefined) {
      return;
    }

    this.result = this.result.map(selectFunction);
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
