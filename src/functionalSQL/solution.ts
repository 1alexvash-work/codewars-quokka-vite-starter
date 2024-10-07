// import { assertDeepEqual } from "../helpers/assertEqual";

// Work on implementing higher order chaining order ❌

// TODO:
// implement operationStack: ❌
// implement reverse operationStack operation ❌
// implement operationStack code execution ❌
// also implement operation parameters preservation, for that I maybe will have to implement some version of shallow methods or what not ❌

type Operation = {
  name: string;
  fn: () => void;
};

class Query {
  operations: Operation[] = [];

  operationA() {
    console.log("operationA");
    this.operations.push({ name: "A", fn: this.operationAReal });

    return this;
  }

  operationB() {
    console.log("operationB");
    this.operations.push({ name: "B", fn: this.operationBReal });

    return this;
  }

  operationAReal() {
    console.log("operationAReal");
  }
  operationBReal() {
    console.log("operationBReal");
  }

  execute() {
    const aOperations = this.operations.filter(
      (operation) => operation.name === "A"
    );
    const bOperations = this.operations.filter(
      (operation) => operation.name === "B"
    );

    const allOperations = [...aOperations, ...bOperations];

    allOperations.forEach((operation) => {
      operation.fn();
    });

    return "Finished";
  }
}
const queryWrapper = () => new Query();
export const query = queryWrapper;

query().operationA().operationB().operationA().execute(); // ?

// class Query {
//   select() {
//     return this;
//   }

//   from(x: number[]) {
//     return this;
//   }

//   execute() {
//     return numbers;
//   }
// }
// const queryWrapper = () => new Query();
// export const query = queryWrapper;

// const numbers = [1, 2, 3];

// assertDeepEqual({
//   expected: query().select().from(numbers).execute(),
//   actual: numbers,
// }); // ?
