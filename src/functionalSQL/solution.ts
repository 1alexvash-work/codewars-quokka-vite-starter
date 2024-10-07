import { assertDeepEqual } from "../helpers/assertEqual";

// Work on the optional chaining order thing, as this thing is going to fuck me further down the line ❌

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
export const query = queryWrapper;

const numbers = [1, 2, 3];

assertDeepEqual({
  expected: query().select().from(numbers).execute(),
  actual: numbers,
}); // ?
