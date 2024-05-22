// www.codewars.com/kata/52f831fa9d332c6591000511/train/typescript

import { assertEqual } from "./helpers/assertEqual";

// Handle different brackets in the formula ✅
// Handle nested brackets in the formula ❌
// One way of dealing it is too index braces, somethig like that (³
// but this is kind of a stupid idea, as it is easier, just to find the most centered brackets and work from there

// Decipher which level of brackets is more nested ❌
// Disect atoms in the formula ❌
// Multiply the count of atoms in the formula ❌

function replaceBrackets(formula: string): string {
  formula = formula.replace(/{/g, "(");
  formula = formula.replace(/}/g, ")");

  formula = formula.replace(/\[/g, "(");
  formula = formula.replace(/\]/g, ")");

  return formula;
}

// TODO
// Find the most nested brackets
// Parse
// Work on outer bit
// Parse
// Return final result

// I can definitely easy find the first closing bracket, and then find the first opening bracket before that

// let's replace  inner brackets with {} to mark the inner zone
// evaluate the expression, bu adding the result to the hashmap
// and then cutting this inner part off
// wait, I can't cut it off, as it might be affected by the outer brackets
// so let's firstly evaluate, the inner brackets and then replace them with the result

function hasBrackets(formula: string): boolean {
  return formula.includes("(");
}

export function parseMolecule(formula: string): Record<string, number> {
  formula = replaceBrackets(formula);

  console.log({ formula });

  if (hasBrackets(formula)) {
    formula = formula.replace(")", "}"); // replace the first closing bracket with }

    let closingBracketIndex = formula.indexOf("}");
    let openingBracketIndex = formula.lastIndexOf("(", closingBracketIndex);

    // Keep debugging tomorrow
    console.log({
      closingBracketIndex,
      openingBracketIndex,
      s1: formula[closingBracketIndex],
      s2: [openingBracketIndex],
    });
  }

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
