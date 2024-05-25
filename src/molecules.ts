// www.codewars.com/kata/52f831fa9d332c6591000511/train/typescript

import { assertDeepEqual } from "./helpers/assertEqual";

// Handle different brackets in the formula ✅
// Handle nested brackets in the formula ❌
// One way of dealing it is too index braces, somethig like that (³
// but this is kind of a stupid idea, as it is easier, just to find the most centered brackets and work from there

// Decipher which level of brackets is more nested ❌
// Disect atoms in the formula ❌
// Multiply the count of atoms in the formula ❌

function adjustBrackets(formula: string): string {
  formula = formula.replace(/{/g, "(");
  formula = formula.replace(/}/g, ")");

  formula = formula.replace(/\[/g, "(");
  formula = formula.replace(/\]/g, ")");

  return formula;
}

function stringToArray(formula: string): string[] {
  return formula.split("");
}

function gatherAtomGroups(formulaArray: string[]): string[] {
  // find all elements
  // iterate over all of them
  // If atom has no number after it, add 1

  // let's split into string, it will make it a bit easier to work with

  // Basically, I need to do two things, during the iteration
  // If the next character is a small letter, then add two atoms into a single element
  // If the number is missing, after this character, or character group, called atom for the short, then add 1 to it
  // If the character is parenthesis, then skip iteration

  const formulaArrayMutated = formulaArray.reduce(
    (accumulator: string[], current, index) => {
      if (current === "") {
        return accumulator;
      }

      const nextCharacter = formulaArray[index + 1];

      const nextCharacterIsPresent = nextCharacter !== undefined;
      const nextCharacterIsLowerCase =
        nextCharacterIsPresent && /[a-z]/.test(nextCharacter);

      if (nextCharacterIsPresent && nextCharacterIsLowerCase) {
        formulaArray[index + 1] = "";

        return accumulator.concat([current + nextCharacter]);
      }

      return accumulator.concat(current);
    },
    []
  );

  return formulaArrayMutated;
}

function parseToObjects(formulaArrayMutated: string[]) {
  const arrayOfObjects = formulaArrayMutated.reduce(
    (accumulator: any[], current, index) => {
      if (current === "") {
        return accumulator;
      }

      const nextCharacter = formulaArrayMutated[index + 1];

      // check if the current character is a letter
      const isCurrentLetter = /[a-zA-Z]{1,2}/.test(current);
      const isNextCharacterNumber = !isNaN(parseInt(nextCharacter));

      if (isCurrentLetter) {
        if (isNextCharacterNumber) {
          formulaArrayMutated[index + 1] = "";

          return accumulator.concat({
            element: current,
            count: parseInt(nextCharacter),
          });
        }

        // if the next is not a number, then add the element with the count of 1
        return accumulator.concat({
          element: current,
          count: 1,
        });
      }

      return accumulator.concat(current);
    },
    []
  );

  // the desired end output [ { element: "H", count: 2 }, { element: "O", count: 1 }]
  // to properly generate this list
  // I need to check whether current iteratable is a letter or a number
  // if it is a letter, then I need to check whether the next iteratable is a number
  // if it is a number, then I need to add the element to the list, with the count
  // if it is a letter, then I need to add the element to the list, with the count of 1

  return arrayOfObjects;
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

function hasBrackets(arrayOfObjects: any[]): boolean {
  return arrayOfObjects.some((element) => element === "(");
}

export function parseMolecule(formula: string): Record<string, number> {
  const answer: Record<string, number> = {};

  // Step one, replace odd brackets ✅
  formula = adjustBrackets(formula);

  let formulaArray = stringToArray(formula);
  formulaArray = gatherAtomGroups(formulaArray);

  let arrayOfObjects = parseToObjects(formulaArray);

  // let's forget about the double digits case, and work on unfolding the brackets

  // no brackets => merge atoms with counts

  // ! Basically work on the last part, while the equation has parentheses, keep unfolding them
  // I keep basically take the first closing bracket, and then find the first opening bracket before that
  // and then evaluate the expression in between
  if (hasBrackets(arrayOfObjects)) {
    // then replace if with while
    // find the first closing bracket
    const closingBracketIndex = arrayOfObjects.findIndex(
      (element) => element === ")"
    );
    const openingBracketIndex = arrayOfObjects
      .slice(0, closingBracketIndex)
      .lastIndexOf("(");

    // replace removed elements with a placeholder "{}"
    const innerBracketsPart = arrayOfObjects
      .splice(
        openingBracketIndex,
        closingBracketIndex - openingBracketIndex + 2,
        "placeholder"
      )
      .filter((element) => element !== "(" && element !== ")");
    // extract multiplier

    // ! WORK ON WHILE LOOP
    // ! Handle the case with double digits, or empty values like in this case
    console.log("innerBracketsPart:", innerBracketsPart);

    const multiplier = innerBracketsPart.splice(-1)[0];
    innerBracketsPart.forEach((element) => (element.count *= multiplier));

    console.log({
      innerBracketsPart,
      multiplier,
    });

    // remove the placeholder elements, and insert the innerBracketsPart elemenets, plural
    arrayOfObjects.splice(openingBracketIndex, 1, ...innerBracketsPart);

    // unfold brackets
  }

  // merge atoms with counts
  // oh this is a cool snippet, it automatically fixes the issue with atom duplication / or the need to flatten out the atoms at the end stage
  arrayOfObjects.forEach(({ element, count }) => {
    if (answer[element]) {
      answer[element] += count;
    } else {
      answer[element] = count;
    }
  });

  return answer;

  // next helper function, merge atoms with counts
  // if there's no count, set it to 1

  // Step two, add atom indexes ❌
  // (This will also, help in terms of pairing groups [atom, count] and [atom, count] in the formula)
  // Can I represent, it in a tree structure, where I have the atom, and then the count, and then the next atom, and then the count
  // Like this =>

  // Step three, find the most nested brackets ❌
  // Step four, evaluate the expression in the most nested brackets ❌
  // Step five, replace the most nested brackets with the result ❌
  // Step six, repeat until no brackets left ❌
  // Flat out a group of similar atoms ❌
}

// assertDeepEqual({
//   actual: parseMolecule("H2O"),
//   expected: {
//     H: 2,
//     O: 1,
//   },
// }); // ?

// assertDeepEqual({
//   actual: parseMolecule("Mg(OH)2"),
//   expected: {
//     Mg: 1,
//     O: 2,
//     H: 2,
//   },
// }); // ?

assertDeepEqual({
  actual: parseMolecule("K4[ON(SO 3)2]2"),
  expected: {
    K: 4,
    O: 14,
    N: 2,
    S: 4,
  },
}); // ?

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

// if I do conversion into "[Mg,5][O,5]([S,1][O,2])"
// it is literally the same thing as if I would do the thing with tree, or for example, {element: "Mg", count: 5}, {element: "O", count: 5}, {element: "S", count: 1}, {element: "O", count: 2}

// okay I talk to much, let's firstly implement the, indexing with a number
// it will at least make it clear, on where there is a number elements pair, and this is going to make this task more simple, similar to the parenthesis substitution
