import axios from "axios";
import { useEffect, useState } from "react";

const HavaDurumu = () => {
  const [hava, setHava] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setHava([...hava, res.data]);
    });
  }, []);

  return (
    <div id="havadurumu">
      <h1>23°</h1>
      <div className="gunler">
        <div>
          <div>Salı</div>
          <div>13°/6°</div>
        </div>
        <div>
          <div>Salı</div>
          <div>13°/6°</div>
        </div>
      </div>
    </div>
  );
};

export default HavaDurumu;
