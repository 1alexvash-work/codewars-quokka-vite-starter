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
  const answer: Record<string, number> = {};

  // Step one, replace odd brackets ✅
  formula = replaceBrackets(formula);

  // Step two, add atom indexes ❌
  // (This will also, help in terms of pairing groups [atom, count] and [atom, count] in the formula)
  // Can I represent, it in a tree structure, where I have the atom, and then the count, and then the next atom, and then the count
  // Like this =>

  // Step three, find the most nested brackets ❌
  // Step four, evaluate the expression in the most nested brackets ❌
  // Step five, replace the most nested brackets with the result ❌
  // Step six, repeat until no brackets left ❌
  // Flat out a group of similar atoms ❌

  return answer;
}

// assertEqual({
//   actual: parseMolecule("H2O"),
//   expected: {
//     H: 2,
//     O: 1,
//   },
// });

assertEqual({
  actual: parseMolecule("Mg(OH)2"),
  expected: {
    Mg: 1,
    O: 2,
    H: 2,
  },
});

// assertEqual({
//   actual: parseMolecule("K4[ON(SO 3)2]2"),
//   expected: {
//     K: 4,
//     O: 14,
//     N: 2,
//     S: 4,
//   },
// });

// Difficult string to parse =>
// K4[ON(SO 3)2]2

// A bit easier string to parse, with only a single type of braces =>
// K4(ON(SO 3)2)2

// Still an easier version to parse, with an individual atom count per element, to distingish groups of atoms =>
// K4(O1N1(S1O3)2)2

// First parenthesis unfold =>
// K4(O1N1S2O6)2

// Second parenthesis unfold =>
// K4O2N2S4O12

// Gather atoms =>
// K4O14N2S4

// Final object result =>
// { K: 4, O: 14, N: 2, S: 4}

// I mean, the string above, is very easy to parse, but I just need to take it step by step, and not try to do everything at once

// * Thoughts, I guess I might be wasting time trying to solve it without regex
// * Also, there's an additional problem I forgout about, it is to flatten out the elements after unfold, in case let's say I have the oxygen twice, though I might just proceed with this step at the final step
