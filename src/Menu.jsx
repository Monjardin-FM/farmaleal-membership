import React from "react";
import FarmaLealLogo from "./assets/img/farmaleal-logo.png";

export const Menu = () => {
  return (
    <div className="w-full px-36 flex flex-row gap-10 items-center font-extralight text-lg">
      <div className="w-20">
        <img src={FarmaLealLogo} />
      </div>
      <div>
        <a href="https://www.farmaleal.com.mx/">Inicio</a>
      </div>
    </div>
  );
};
