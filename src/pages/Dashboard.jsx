import { useEffect, useState } from "react";
import { getUserStatistics } from "../service/apiService";

export default function Dashboard() {
  //save data in local state variable
  const [statistics, setStatistics] = useState([]);
  const userId = 1;

  //get statistic data
  useEffect(() => {
    getUserStatistics(userId).then((response) => setStatistics(response.data));
  }, []);
  console.log(statistics);
  //map data to jsx elements
  const statisticItems = statistics.map((item) => {
    return (
      <div className="statistic-item">
        <div className="statistic-item--container">
          <p>{item.name}</p>
          <h2>{item.value}</h2>
        </div>
      </div>
    );
  });
  //render jsx elements
  console.log(statistics);
  return (
    <div className="statistic-main">
      <h1>Your total statistics</h1>
      <div className="items-container">{statisticItems}</div>
    </div>
  );
}
