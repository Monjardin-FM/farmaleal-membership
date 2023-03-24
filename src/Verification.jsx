import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppFormLabel } from "./presentation/Components/AppFormLabel";
import { AppTextField } from "./presentation/Components/AppTextField";
import { Navbar } from "./navbar";
import { Menu } from "./Menu";
import Swal from "sweetalert2";
// import { useConfirmMembership } from "./hooks/use-confirm-membership";
import { confirmMembership } from "./services/confirmMembership";

export const Verification = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [verificationPassword, setVerificationPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  // const { confirmMember, loading, error } = useConfirmMembership();
  const handleClick = async () => {
    const flag = await confirmMembership({
      email: email,
      password: password,
    });
    console.log(flag);
    if (flag) {
      Swal.fire({
        title: "Cuenta creada con éxito",
        text: "Ya puedes disfrutar de los beneficios de tu membresia de Club FarmaLeal",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#15A186",
      });
    }
    // if (!flag) {
    //   Swal.fire({
    //     title: "Error al crear la cuenta",
    //     text: "Vuelve a intentarlo",
    //     icon: "error",
    //     confirmButtonText: "Ok",
    //     confirmButtonColor: "#15A186",
    //   });
    // }
  };
  // useEffect(() => {
  //   if (error) {
  //     Swal.fire({
  //       title: "Error al crear la cuenta",
  //       text: "Vuelve a intentarlo",
  //       icon: "error",
  //       confirmButtonText: "Ok",
  //       confirmButtonColor: "#15A186",
  //     });
  //   }
  // });
  useEffect(() => {
    if (verificationPassword !== password) {
      setValidatePassword(true);
    } else {
      setValidatePassword(false);
    }
  }, [verificationPassword.length, password.length]);
  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <Navbar />
      <Menu />
      <hr className="w-full" />

      <div className="font-semibold text-4xl text-sky-900">
        MEMBRESÍA CLUB FARMALEAL
      </div>
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
          <AppTextField
            className="w-full"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col items-start justify-center col-span-3 col-start-2">
          <AppFormLabel label="Confirmar Contraseña:" />
          <AppTextField
            className="w-full"
            type="password"
            onChange={(e) => setVerificationPassword(e.target.value)}
            value={verificationPassword}
          />
          {validatePassword && (
            <div className="text-red-600 text-xs ">
              * Las contraseñas no coinciden
            </div>
          )}
        </div>
        <div className="col-span-1 col-start-3">
          <button
            className="w-full bg-sky-900 p-3 text-white hover:bg-sky-800 transition duration-200 disabled:cursor-not-allowed"
            disabled={
              !!validatePassword || verificationPassword.length === 0
              // || loading
            }
            onClick={handleClick}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
