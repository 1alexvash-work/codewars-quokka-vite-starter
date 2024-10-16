class DataGrouper {
  private data: any[];

  constructor(data: any[]) {
    this.data = data; // Initialize the class with the data
  }

  // GroupBy method that only takes the fields and uses the class's internal data
  groupBy(...fields: any[]): any {
    // Base case: if no fields are provided, return the original data
    if (fields.length === 0) return this.data;

    // Group data by the current field
    const field = fields[0]; // Take the first field
    const groupedData: {
      [key: string]: any;
    } = {};

    this.data.forEach((item: any) => {
      const key = item[field]; // Get the value of the field (e.g., profession)
      if (!groupedData[key]) {
        groupedData[key] = []; // Initialize an empty array for the group
      }
      groupedData[key].push(item); // Push the item into the group
    });

    // Recursively group the inner data by remaining fields
    for (let key in groupedData) {
      const subgroup = new DataGrouper(groupedData[key]); // Create a new instance for recursion
      groupedData[key] = subgroup.groupBy(...fields.slice(1));
    }

    return groupedData;
  }
}

const data = [
  { name: "John", profession: "Engineer", country: "USA" },
  { name: "Jane", profession: "Doctor", country: "Canada" },
  { name: "Mike", profession: "Engineer", country: "Canada" },
];

const grouper = new DataGrouper(data);
const result = grouper.groupBy("profession", "country");
console.log(result);

const users = [
  { profession: "teacher", name: "Jake" },
  { profession: "teacher", name: "Jennifer" },
  { profession: "firefighter", name: "Mike" },
  { profession: "engineer", name: "Alice" },
  { profession: "firefighter", name: "John" },
];

const grouper2 = new DataGrouper(users);
const result2 = grouper2.groupBy("profession", "name");
console.log("result2:", result2);
