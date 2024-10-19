import { assertDeepEqual } from "../helpers/assertEqual";
import { query } from "./solution";

// SELECT * FROM persons WHERE profession='teacher' GROUPBY profession, name, age
var persons = [
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Michael",
    profession: "teacher",
    age: 50,
    maritalStatus: "single",
  },
  {
    name: "Peter",
    profession: "teacher",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "married",
  },
  {
    name: "Rose",
    profession: "scientific",
    age: 50,
    maritalStatus: "married",
  },
  {
    name: "Anna",
    profession: "scientific",
    age: 20,
    maritalStatus: "single",
  },
  {
    name: "Anna",
    profession: "politician",
    age: 50,
    maritalStatus: "married",
  },
];

function profession(person: any) {
  return person.profession;
}

function name(person: any) {
  return person.name;
}

function age(person: any) {
  return person.age;
}

function maritalStatus(person: any) {
  return person.maritalStatus;
}

const actual = query()
  .select()
  .from(persons)
  .groupBy(profession, name, age, maritalStatus)
  .execute();

const expected = [
  [
    "teacher",
    [
      [
        "Peter",
        [
          [
            20,
            [
              [
                "married",
                [
                  {
                    name: "Peter",
                    profession: "teacher",
                    age: 20,
                    maritalStatus: "married",
                  },
                  {
                    name: "Peter",
                    profession: "teacher",
                    age: 20,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
      [
        "Michael",
        [
          [
            50,
            [
              [
                "single",
                [
                  {
                    name: "Michael",
                    profession: "teacher",
                    age: 50,
                    maritalStatus: "single",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "scientific",
    [
      [
        "Anna",
        [
          [
            20,
            [
              [
                "married",
                [
                  {
                    name: "Anna",
                    profession: "scientific",
                    age: 20,
                    maritalStatus: "married",
                  },
                ],
              ],
              [
                "single",
                [
                  {
                    name: "Anna",
                    profession: "scientific",
                    age: 20,
                    maritalStatus: "single",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
      [
        "Rose",
        [
          [
            50,
            [
              [
                "married",
                [
                  {
                    name: "Rose",
                    profession: "scientific",
                    age: 50,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "politician",
    [
      [
        "Anna",
        [
          [
            50,
            [
              [
                "married",
                [
                  {
                    name: "Anna",
                    profession: "politician",
                    age: 50,
                    maritalStatus: "married",
                  },
                ],
              ],
            ],
          ],
        ],
      ],
    ],
  ],
];

assertDeepEqual({ actual, expected }); // ?
