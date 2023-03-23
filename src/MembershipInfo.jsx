import React from "react";
import Membership from "./assets/img/membresia.png";

export const MembershipInfo = () => {
  return (
    <>
      <h1 className="font-normal text-5xl text-sky-900">
        MEMBRESÍA CLUB FARMALEAL
      </h1>
      <div className=" flex flex-row w-screen justify-center gap-20">
        <div className="w-1/3">
          <img src={Membership} />
        </div>
        <div className="w-1/3 text-justify gap-5 flex flex-col">
          <h2 className="text-3xl">Beneficios:</h2>
          <ul className="list-disc text-lg">
            <li>Adquiere tus productos al precio más bajo del mercado</li>
            <li>Entrega nacional </li>
            <li>Garantía de entrega </li>
            <li>Sin límite de compras</li>
            <li>1 producto gratis al mes</li>
            <li>Telemedicina</li>
            <li>Red de descuentos</li>
            <li>Catálogo completo</li>
          </ul>
          <span className="text-slate-500 text-xs">
            *El precio de los envíos corre por cuenta del afiliado. CDMX y área
            metropolitana sin costo
          </span>
        </div>
      </div>
    </>
  );
};
