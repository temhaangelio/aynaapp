import { useState } from "react";
import {
  BsCloudsFill,
  BsCloudSnowFill,
  BsFillCloudRainFill,
  BsFillCloudLightningFill,
  BsFillCloudyFill,
  BsFillCloudSunFill,
  BsSnow2,
  BsFillCloudHazeFill,
} from "react-icons/bs";
import { MdWbSunny, MdNightlight } from "react-icons/md";

const HavaDurumuIcon = ({ desc, stil }) => {
  const [icon, setIcon] = useState(null);

  useState(() => {
    switch (desc) {
      case "01d":
        setIcon(<MdWbSunny style={stil} />);
        break;
      case "01n":
        setIcon(<MdNightlight style={stil} />);
        break;
      case "02d" || "02n":
        setIcon(<BsFillCloudSunFill style={stil} />);
        break;
      case "03d" || "03n":
        setIcon(<BsFillCloudyFill style={stil} />);
        break;
      case "04d" || "04n":
        setIcon(<BsCloudsFill style={stil} />);
        break;
      case "09d" || "09n":
        setIcon(<BsCloudSnowFill style={stil} />);
        break;
      case "10d" || "10n":
        setIcon(<BsFillCloudLightningFill style={stil} />);
        break;
      case "11d" || "11n":
        setIcon(<BsFillCloudRainFill style={stil} />);
        break;
      case "13d" || "13n":
        setIcon(<BsSnow2 style={stil} />);
        break;
      case "50d" || "50n":
        setIcon(<BsFillCloudHazeFill style={stil} />);
        break;
      default:
        break;
    }
  }, []);

  return icon;
};

export default HavaDurumuIcon;
