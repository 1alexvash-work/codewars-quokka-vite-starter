function groupBy(data: any, ...fields: any) {
  // Base case: if no fields are provided, return the original data
  if (fields.length === 0) return data;

  // Group data by the current field
  const field = fields[0]; // Take the first field
  const groupedData: {
    [key: string]: any;
  } = {};

  data.forEach((item: any) => {
    const key = item[field]; // Get the value of the field (e.g., profession)
    if (!groupedData[key]) {
      groupedData[key] = []; // Initialize an empty array for the group
    }
    groupedData[key].push(item); // Push the item into the group
  });

  // Recursively group the inner data by remaining fields
  for (let key in groupedData) {
    groupedData[key] = groupBy(groupedData[key], ...fields.slice(1));
  }

  return groupedData;
}

const users = [
  { profession: "teacher", name: "Jake" },
  { profession: "teacher", name: "Jennifer" },
  { profession: "firefighter", name: "Mike" },
  { profession: "engineer", name: "Alice" },
  { profession: "firefighter", name: "John" },
];

// Grouping by profession and then by name (assuming more specific grouping)
const result = groupBy(users, "profession", "name");
console.log(result);
