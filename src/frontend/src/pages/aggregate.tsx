import React, { useState } from "react";
function Aggregate() {
  // reactive value + setter
  const [data, setData] = useState(null);

  // basic fetch
  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/getAggregation");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result); // store result in data variable
    } catch (error) {
      console.error("Error fetching data: ", error);
      setData(null);
    }
  };

  return (
    <div>
      <div>Aggregate</div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default Aggregate;
