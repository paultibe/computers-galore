import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function Aggregate() {
  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [lastAction, setLastAction] = useState(""); // state to track the last action

  const fetchCountByBrand = async () => {
    await fetchData("http://127.0.0.1:8000/getCountByBrand");
    setLastAction("countByBrand");
  };

  const fetchAvgPrice = async () => {
    await fetchData("http://127.0.0.1:8000/getAvgPrice");
    setLastAction("avgPrice");
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setData([]);
      setIsDataFetched(false);
    }
  };

  // will clear all the data
  const clearData = () => {
    setData([]);
    setIsDataFetched(false);
    setLastAction(""); // clear last action
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Let's do some aggregations shall we
      </h2>
      <div className="mb-4 flex space-x-2">
        <Button
          onClick={fetchCountByBrand}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Count by Brand
        </Button>
        <Button
          onClick={fetchAvgPrice}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Group by having
        </Button>
        <Button
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
          disabled
        >
          Group by nested
        </Button>
        <Button
          onClick={clearData}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Clear
        </Button>
      </div>
      {/* conditional rendering */}
      {isDataFetched && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                {lastAction === "countByBrand" && (
                  <TableCell align="right">Count</TableCell>
                )}
                {lastAction === "avgPrice" && (
                  <TableCell align="right">Average Price</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Brand}
                  </TableCell>
                  {lastAction === "countByBrand" && (
                    <TableCell align="right">{row["COUNT(*)"]}</TableCell>
                  )}
                  {lastAction === "avgPrice" && (
                    <TableCell align="right">{row["AVG(Price)"]}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Aggregate;
