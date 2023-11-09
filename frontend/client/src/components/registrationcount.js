import React, { useState, useEffect } from "react";
import axios from "axios";

const NgoCount = () => {
  const [ngoCount, setNgoCount] = useState(0);

  useEffect(() => {
    // Fetch the number of NGOs from your API endpoint
    axios.get("/ngoconnect/ngonumber").then((response) => {
      setNgoCount(response.data.ngo_count);
    });
  }, []);

  return (
    <div>
      <h5>Number of NGOs: {ngoCount}</h5>
    </div>
  );
};

export default NgoCount;
