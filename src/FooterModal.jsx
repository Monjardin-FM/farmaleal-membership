import React from "react";
import creditCards from "./assets/img/cards1.png";
import debitCards from "./assets/img/cards2.png";
import openpayLogo from "./assets/img/openpay.png";
import encrypt from "./assets/img/security.png";
export const FooterModal = () => {
  return (
    <div className="flex flex-row   justify-start text-cyan-800 font-semibold divide-x-2 h-20 ">
      <div className="grid grid-cols-2 items-start">
        <div className="flex flex-col items-center justify-center text-cyan-800 font-semibold col-span-1">
          <h4 className="text-xs">Tarjetas de crédito</h4>
          <img src={creditCards} />
        </div>
        <div className="flex flex-col items-center justify-center text-cyan-800 font-semibold col-span-1">
          <h4 className="text-xs">Tarjetas de débito</h4>
          <img src={debitCards} />
        </div>
      </div>
      <div className="grid grid-cols-2 items-start">
        <div className="flex flex-col gap-2 p-2 justify-center items-center col-span-1">
          <div>
            <span className="text-xs">Transacciones realizadas vía:</span>
          </div>
          <div className="w-36">
            <img src={openpayLogo} />
          </div>
        </div>

        <div className="flex flex-row items-center   p-2 col-span-1">
          <div className="w-24">
            <img src={encrypt} />
          </div>
          <span className="text-xs text-start">
            Tus pagos se realizan de forma segura con encriptación de 256 bits
          </span>
        </div>
      </div>
    </div>
  );
};
