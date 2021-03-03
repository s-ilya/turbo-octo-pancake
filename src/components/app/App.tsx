import { useCallback, useEffect, useState } from "react";
import { getLatestListings } from "../../services/coinmarket";

function App() {
  const [data, setData] = useState({});

  const getData = useCallback(() => {
    getLatestListings().then(setData);
  }, []);

  useEffect(getData, [getData]);

  return (
    <div className="App">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
