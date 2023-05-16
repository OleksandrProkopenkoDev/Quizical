import { useEffect, useState } from "react";
import { getUserStatistics } from "../service/apiService";
import { useAuth } from "../service/auth";

export default function Dashboard() {
  //save data in local state variable
  const [statistics, setStatistics] = useState([]);
  const auth = useAuth();
  const user = auth.user;

  //get statistic data
  useEffect(() => {
    getUserStatistics(user).then((response) => setStatistics(response.data));
  }, []);

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
  // console.log(statistics);
  return (
    <div className="statistic-main">
      <h1>Your total statistics</h1>
      <div className="items-container">{statisticItems}</div>
    </div>
  );
}
