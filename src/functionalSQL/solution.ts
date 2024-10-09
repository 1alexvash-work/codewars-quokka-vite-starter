import { assertDeepEqual } from "../helpers/assertEqual";

type Operation = {
  name: string;
  fn: () => void;
  args: any[];
};

class Query {
  operations: Operation[] = [];

  select(args: any[] = []) {
    this.operations.push({ name: "B", fn: this.selectReal, args });

    return this;
  }

  from(x: number[]) {
    this.operations.push({ name: "A", fn: () => this.fromReal(x), args: x });

    return this;
  }

  selectReal() {}

  fromReal(x: number[]) {}

  execute() {
    const fromOperations = this.operations.filter(
      (operation) => operation.name === "A"
    );
    const selectOperations = this.operations.filter(
      (operation) => operation.name === "B"
    );

    const allOperations = [...fromOperations, ...selectOperations];

    allOperations.forEach(({ fn }) => fn());

    return numbers;
  }
}
const queryWrapper = () => new Query();
export const query = queryWrapper;

// query().operationA([1, 2, 3]).operationB().operationA().execute(); // ?

const numbers = [1, 2, 3];

assertDeepEqual({
  expected: query().select().from(numbers).execute(),
  actual: numbers,
}); // ?
