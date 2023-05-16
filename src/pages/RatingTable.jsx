import { useEffect, useState } from "react";
import { getRatingData } from "../service/apiService";
import { useAuth } from "../service/auth";

export default function RatingTable() {
  //have variable containing this data
  const [ratingData, setRatingData] = useState([]);
  const auth = useAuth();
  const user = auth.user;
  //recieve data from api (array of records)

  useEffect(() => {
    getRatingData(user).then((response) => setRatingData(response.data));
  }, []);

  const ratingRecords = ratingData.map((record) => {
    return (
      <div className="rating-record" key={record.id}>
        <p>{record.position}</p>
        <p>{record.nickname}</p>
        <p className="rating-number">{record.rating}</p>
      </div>
    );
  });
  //make jsx elements by maping data

  return (
    <div className="table-container">
      <h1>Best players</h1>
      {ratingRecords}
    </div>
  );
}
