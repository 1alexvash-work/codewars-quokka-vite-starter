import { assertDeepEqual } from "../helpers/assertEqual";

class Query {
  select() {
    return this;
  }

  from(x: number[]) {
    return this;
  }

  execute() {
    return numbers;
  }
}

const queryWrapper = () => new Query();

const query = queryWrapper;

const numbers = [1, 2, 3];

assertDeepEqual({
  expected: query().select().from(numbers).execute(),
  actual: numbers,
}); // ?
