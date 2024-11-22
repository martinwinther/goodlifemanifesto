import { useState, useEffect } from "react";
import { Sun } from "lucide-react";
import SunCalc from "suncalc";

const SunTimes = () => {
  const [times, setTimes] = useState({ sunrise: "", sunset: "" });

  useEffect(() => {
    const calculateSunTimes = (lat: number, lng: number) => {
      const today = new Date();
      const sunTimes = SunCalc.getTimes(today, lat, lng);

      const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      setTimes({
        sunrise: formatTime(sunTimes.sunrise),
        sunset: formatTime(sunTimes.sunset),
      });
    };

    // Get location from IP address
    const getLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data.latitude && data.longitude) {
          calculateSunTimes(data.latitude, data.longitude);
        } else {
          throw new Error("No location data");
        }
      } catch (error) {
        // Fallback to default location if IP geolocation fails
        calculateSunTimes(51.5074, -0.1278);
      }
    };

    getLocation();
  }, []);

  if (!times.sunrise || !times.sunset) return null;

  return (
    <div className="flex items-center space-x-2 text-sm text-aro-200">
      <Sun size={16} />
      <span>
        ↑{times.sunrise} ↓{times.sunset}
      </span>
    </div>
  );
};

export default SunTimes;
