import { Column } from "../../features/columns/columns";

const COLUMNS: Column[] = [
  {
    id: "001",
    ordinalNo: 0,
    title: "Id",
    type: "string",
    width: 100,
  },
  {
    id: "003",
    ordinalNo: 2,
    title: "Age",
    type: "number",
    width: 100,
  },
  {
    id: "002",
    ordinalNo: 1,
    title: "Name",
    type: "string",
    width: 100,
  },
  {
    id: "004",
    ordinalNo: 5,
    title: "Subscribed",
    type: "boolian",
    width: 150,
  },
  {
    id: "005",
    ordinalNo: 3,
    title: "Email",
    type: "string",
    width: 150,
  },
  {
    id: "006",
    ordinalNo: 6,
    title: "Membership",
    type: "options",
    width: 100,
  },
  {
    id: "007",
    ordinalNo: 7,
    title: "Purchases",
    type: "number",
    width: 100,
  },
  {
    id: "008",
    ordinalNo: 4,
    title: "Phone Number",
    type: "string",
    width: 150,
  },
];

export default COLUMNS;
