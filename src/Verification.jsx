import React from "react";
import { useSearchParams } from "react-router-dom";
import { AppFormLabel } from "./presentation/Components/AppFormLabel";
import { AppTextField } from "./presentation/Components/AppTextField";
import { Navbar } from "./navbar";

export const Verification = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("token");
  return (
    <div className="w-screen  flex flex-col items-center justify-center gap-10">
      <Navbar />
      <div className="font-semibold text-4xl text-sky-900">CLUB FARMALEAL</div>
      <div className="w-2/5 h-1/2 bg-slate-100 rounded-lg p-14 grid grid-cols-5 items-center justify-center gap-5 border border-gray-800 border-opacity-10">
        <div className="col-span-5 text-center text-lg font-semibold">
          Creación de cuenta
        </div>
        <div className="flex flex-col items-start justify-center col-span-3 col-start-2">
          <AppFormLabel label="Correo Electrónico: " />
          <AppTextField
            value={email}
            disabled={true}
            className="w-full bg-white p-1 h-8 disabled:bg-cyan-50 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col items-start justify-center col-span-3 col-start-2 ">
          <AppFormLabel label="Contraseña:" />
          <AppTextField className="w-full" type="password" />
        </div>
        <div className="flex flex-col items-start justify-center col-span-3 col-start-2">
          <AppFormLabel label="Confirmar Contraseña:" />
          <AppTextField className="w-full" type="password" />
        </div>
        <div className="col-span-1 col-start-3">
          <button className="w-full bg-sky-900 p-3 text-white hover:bg-sky-800 transition duration-200">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
