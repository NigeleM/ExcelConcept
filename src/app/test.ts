import * as fs from 'fs';

// Read the JSON file
const rawData = fs.readFileSync('data.json', 'utf8');
const data: any[] = JSON.parse(rawData);

// Define the TypeScript interface
interface Person {
  id: number;
  name: string;
}

// You can iterate over the data array to create TypeScript objects
const typedData: Person[] = data.map((item) => ({
  id: item.id,
  name: item.name,
}));

console.log(typedData); // This will print the TypeScript objects
