import { assertDeepEqual } from "../helpers/assertEqual";

type Operation = {
  name: string;
  fn: (...args: any[]) => void;
  args: any[];
};

// Later Add validation for cases with invalid parameters flow

// Later Add validation for all methods

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

  select(args?: any) {
    this.operations.push({
      name: "3",
      fn: () => this.selectReal(args),
      args,
    });

    return this;
  }

  groupBy(args: any) {
    this.operations.push({
      name: "4",
      fn: () => this.groupByReal(args),
      args,
    });

    return this;
  }

  having(args: any) {
    this.operations.push({
      name: "5",
      fn: () => this.havingReal(args),
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

  whereReal(args: any) {}

  selectReal(selectFunction: any) {
    if (selectFunction === undefined) {
      return;
    }

    this.result = this.result.map(selectFunction);
  }

  groupByReal(args: any) {}

  havingReal(args: any) {}

  orderByReal(args: any) {}

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

const numbers = [1, 2, 3];

assertDeepEqual({
  expected: query().select().from(numbers).execute(),
  actual: numbers,
}); // ?
