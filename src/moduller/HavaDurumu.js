import axios from "axios";
import { useEffect, useState } from "react";

const HavaDurumu = () => {
  const [hava, setHava] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=40.193298&lon=29.074202&exclude=current,hourly,minutely,alerts&units=metric&lang=tr&appid=" +
          process.env.REACT_APP_HAVADURUMU
      )
      .then((res) => {
        setHava((current) => [...hava, ...res.data.daily]);
      });
  }, []);

  return (
    <div id="havadurumu">
      <h1>{hava[0]?.temp.day.toFixed(0)}°</h1>
      <div className="gunler">
        {hava.map((gun, index) => {
          if (index < 5) {
            return (
              <div className="gun" key={gun.temp.day}>
                <h1>{gun.temp.day.toFixed(0)}°</h1>
                <span>
                  {new Date(gun.dt * 1000).toLocaleDateString("tr", {
                    weekday: "long",
                  })}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HavaDurumu;
