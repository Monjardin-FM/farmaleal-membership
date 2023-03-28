import React from "react";
import Membership from "./assets/img/membresia.png";

export const MembershipInfo = () => {
  return (
    <>
      <h1 className="font-normal text-3xl text-sky-900">
        MEMBRESÍA CLUB FARMALEAL
      </h1>
      <div className=" flex flex-row w-screen justify-center gap-x-20">
        <div className="w-1/3">
          <img src={Membership} />
        </div>
        <div className="w-1/3 text-justify gap-5 flex flex-col">
          <h2 className="text-2xl">Beneficios:</h2>
          <ul className="list-disc text-base">
            <li>
              Los medicamentos que quieras al precio más bajo (Te lo aseguramos)
            </li>
            <li>
              1 producto gratis al mes, de nuestro catalogo de mas de xxxx
              productos, donde cubrimos los principales padecimientos.
              <span className="text-slate-500 text-xs">
                {" El costo de envío de este producto es gratis en CDMX"}
              </span>
            </li>
            <li>
              Incluye videollamada con un doctor 24/7 (medicina general,
              pediatria, ginecólogo, nutriólogo, psicólogo)
            </li>
            <li>
              TDC nuestra red de descuentos a nivel nacional (más de 5000
              descuentos en establecimientos.)
              <span className="text-slate-500 text-xs">
                <a href="#">{" Consultalo en nuestra página"}</a>
              </span>
            </li>
            <li>
              Entrega nacional.
              <span className="text-slate-500 text-xs">
                {
                  " El costo de los envíos corre por cuenta del afiliado. CDMX sin costo."
                }
              </span>
            </li>
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
