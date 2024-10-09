import { assertDeepEqual } from "../helpers/assertEqual";

type Operation = {
  name: string;
  fn: () => void;
  args: any[];
};

// Later Add validation for cases with invalid parameters flow

class Query {
  operations: Operation[] = [];
  result: any = [];

  select(args?: any) {
    this.operations.push({
      name: "2",
      fn: this.selectReal,
      args,
    });

    return this;
  }

  from(array: any[]) {
    this.operations.push({
      name: "1",
      fn: () => this.fromReal(array),
      args: array,
    });

    return this;
  }

  selectReal() {}

  fromReal(array: number[]) {
    this.result = array;
  }

  execute() {
    const fromOperations = this.operations.filter(
      (operation) => operation.name === "1"
    );
    const selectOperations = this.operations.filter(
      (operation) => operation.name === "2"
    );

    const allOperations = [...fromOperations, ...selectOperations];

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
