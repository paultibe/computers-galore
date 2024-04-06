import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { BE_BASE_URL } from "../constants";

const Projection = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch all table names
    const fetchTables = async () => {
      try {
        const response = await fetch(`${BE_BASE_URL}/getAllTables`);
        const tables = await response.json();
        const tableNames = tables.map((table) => table.Tables_in_304_db);
        console.log("my tables", tableNames);
        setTables(tableNames);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    };

    fetchTables();
  }, []);

  const handleTableChange = async (event) => {
    const tableName = event.target.value;
    setSelectedTable(tableName);
    // Fetch attributes for the selected table
    // console.log(selectedTable);
    try {
      const response = await fetch(
        `${BE_BASE_URL}/getTuplesByAttributes/${tableName}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // get an array of attribute names
        const attributeNames = Object.keys(data[0]);
        setAttributes(attributeNames);
      } else {
        console.error("Received data is not an array or is empty");
        setAttributes([]);
      }
      setSelectedAttributes([]);
    } catch (error) {
      console.error(
        `Failed to fetch attributes for table ${tableName}:`,
        error
      );
    }
  };

  const handleAttributeChange = (event) => {
    setSelectedAttributes(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedTable || selectedAttributes.length === 0) {
      alert("Please select a table and at least one attribute");
      return;
    }

    try {
      console.log(selectedTable);
      console.log(selectedAttributes);
      const response = await fetch(
        `${BE_BASE_URL}/getTuplesByAttributes/${selectedTable}?attributes=${selectedAttributes.join(
          ","
        )}`
      ); //
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Render part of the component
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Table</InputLabel>
        <Select
          value={selectedTable}
          label="Table"
          onChange={handleTableChange}
        >
          {tables.map((table) => (
            <MenuItem key={table} value={table}>
              {table}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Attributes</InputLabel>
        <Select
          multiple
          value={selectedAttributes}
          onChange={handleAttributeChange}
          input={<OutlinedInput label="Attributes" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {attributes.map((attribute) => (
            <MenuItem key={attribute} value={attribute}>
              <Checkbox checked={selectedAttributes.indexOf(attribute) > -1} />
              <ListItemText primary={attribute} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>

      {/* Display data in a simple table or use a more sophisticated component like DataGrid */}
    </div>
  );
};

export default Projection;
