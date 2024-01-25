import { assertEqual } from "../helpers/assertEqual";
import { add } from "./add";

const result = assertEqual({
  actual: add(1, 2),
  expected: 3,
});

console.log("result:", result);
