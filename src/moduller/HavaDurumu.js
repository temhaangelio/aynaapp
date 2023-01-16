import axios from "axios";
import { useEffect, useState } from "react";
import HavaDurumuIcon from "../components/HavaDurumuIcon";

const HavaDurumu = () => {
  const [hava, setHava] = useState([]);

  useEffect(() => {
    havaDurumuGetir();
  }, []);

  const havaDurumuGetir = () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/onecall?lat=40.193298&lon=29.074202&exclude=current,hourly,minutely,alerts&units=metric&appid=" +
          process.env.REACT_APP_HAVADURUMU
      )
      .then((res) => {
        setHava(res.data.daily);
      });
  };

  const havaComp = (gun, index) => {
    if (index < 5) {
      return (
        <div
          key={gun.temp.day}
          className="d-flex flex-column align-items-center"
          style={{ marginRight: 30 }}
        >
          <HavaDurumuIcon
            desc={gun.weather[0].icon}
            stil={{ fontSize: "2em" }}
          />
          <h1 style={{ marginBottom: 0, marginTop: 20 }}>
            {gun.temp.day.toFixed(0)}°
          </h1>
          <span>
            {new Date(gun.dt * 1000).toLocaleDateString("tr", {
              weekday: "long",
            })}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <div className="text-center">
        <h1 style={{ fontSize: "10vh", marginBottom: 50 }}>
          <HavaDurumuIcon
            desc={hava[0]?.weather[0].icon}
            stil={{ fontSize: "1em" }}
          />
          {hava[0]?.temp.day.toFixed(0)}°
        </h1>
      </div>
      <div>
        <div className="d-flex justify-content-center text-center">
          {hava.map((gun, index) => havaComp(gun, index))}
        </div>
      </div>
    </div>
  );
};

export default HavaDurumu;
