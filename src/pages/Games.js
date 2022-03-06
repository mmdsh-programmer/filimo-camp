import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Games() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [gameSource, setGameSource] = useState(null);
  const storageAddress = useRef(null);

  const syncScore = () => {
    const totalScore = localStorage.getItem(storageAddress.current);
    console.log("storage value changed! ", +totalScore);
  };

  useEffect(() => {
    switch (+id) {
      case 1:
        setGameSource("../games/pac-chef/index.html");
        storageAddress.current = "pac_chef_score";
        break;
      case 2:
        setGameSource("../games/Bubble-shooter/index.html");
        storageAddress.current = "bubble_shooter_score";
        break;
      case 3:
        setGameSource("../games/jelly-island/index.html");
        storageAddress.current = "jelly_island_score";
        break;
      case 4:
        setGameSource("../games/lights/index.html");
        storageAddress.current = "lights_total_score";
        break;
      case 5:
        setGameSource("../games/sourcerer/index.html");
        storageAddress.current = "sourcerer_score";
        break;
      default:
        navigator("/");
        break;
    }

    window.addEventListener("storage", syncScore);

    return () => window.removeEventListener("storage", syncScore);
  }, []);

  return (
    <main className="min-h-screen">
      <iframe className="w-full h-screen" src={gameSource} frameBorder="0" />
    </main>
  );
}
