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
      id: "002",
      ordinalNo: 1,
      title: "Name",
      type: "string",
      width: 100,
    },
    {
      id: "003",
      ordinalNo: 2,
      title: "Age",
      type: "number",
      //width: 150,
    },
    {
      id: "004",
      ordinalNo: 2,
      title: "In debt",
      type: "boolian",
      width: 100,
    },
  ];

  export default COLUMNS;