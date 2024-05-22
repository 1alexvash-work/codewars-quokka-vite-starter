import { assertEqual } from "./helpers/assertEqual";

export function parseMolecule(formula: string): Record<string, number> {
  const groups = formula.match(/[A-Z][a-z]*\d*|\([^\)]+\)\d*/g);
  console.log("groups:", groups);

  return {};
}

assertEqual({
  actual: parseMolecule("H2O"),
  expected: {
    H: 2,
    O: 1,
  },
});

assertEqual({
  actual: parseMolecule("Mg(OH)2"),
  expected: {
    Mg: 1,
    O: 2,
    H: 2,
  },
});

assertEqual({
  actual: parseMolecule("K4[ON(SO 3)2]2"),
  expected: {
    K: 4,
    O: 14,
    N: 2,
    S: 4,
  },
});

// TODO:
// parser
// Collect atoms with their appropriate group
// Handle brackets
// Multiple the count

// I can hack it with regex, or some regex solution, but I want to do it properly

// This is really kyo5 even though some say it's kyo4
// Cuz I already worked with brackets for the math kata, so I do have an experience, and it should be easier for me, though that time, I kind of hacked it

// Maybe drill the inner group, and just multiply the count, and then merge it with the outer group
// Though, I need a logic to select the atom, as it can be a single letter or a double letter

// It would be really fun to solve, it without regex

// Basically this problem boils down, to two subproblems
// Disect atoms
// Handle parentheses
// Handle nested parentheses (this one is really hard to solve without)
