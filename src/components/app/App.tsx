import { useCallback, useEffect, useState } from "react";
import { getLatestListings } from "../../services/coinmarket";
import Coin from "../../services/coin";
import Table from "../table/Table";

function App() {
  const [data, setData] = useState<Coin[]>([]);

  const getData = useCallback(() => {
    getLatestListings().then(setData);
  }, []);

  useEffect(getData, [getData]);

  return (
    <div className="App">
      <Table coins={data} />
    </div>
  );
}

export default App;
