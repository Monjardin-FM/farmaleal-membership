import React, { useState } from "react";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import Membership from "./assets/img/membresia.png";
import FarmaLealLogo from "./assets/img/farmaleal-logo.png";
import { ModalPayment } from "./ModalPayment";
export const App = () => {
  const [showModalMembership, setShowModalMembership] = useState(false);
  return (
    <>
      <ModalPayment
        isVisible={showModalMembership}
        onClose={() => setShowModalMembership(false)}
      />
      <div className="flex flex-col justify-center items-center gap-7 mb-5 overflow-hidden">
        <div
          className="flex flex-row w-full justify-center items-center p-2"
          style={{ background: "#15A186" }}
        >
          <div className="text-white">
            <p>
              Tu farmacia digital en productos de especialidad - Envíos a todo
              México
            </p>
          </div>
          <div className="flex flex-row absolute right-7 gap-5">
            <a href="https://twitter.com/FarmaLeal/">
              <AiOutlineTwitter size={23} color="#fff" />
            </a>
            <a href="https://www.facebook.com/CFarmaLeal/">
              <AiFillFacebook size={23} color={"#fff"} />
            </a>
            <a href="https://www.instagram.com/farmaleal/">
              <AiOutlineInstagram size={23} color="#fff" />
            </a>
            <a href="https://www.youtube.com/channel/UCVezBeVMt6iPAsq2a9_4CIA">
              <AiFillYoutube size={23} color="#fff" />
            </a>
          </div>
        </div>
        <div className="w-full px-36 flex flex-row gap-10 items-center font-extralight text-lg">
          <div className="w-20">
            <img src={FarmaLealLogo} />
          </div>
          <div>
            <a href="https://www.farmaleal.com.mx/">Inicio</a>
          </div>
        </div>
        <hr className="w-full" />
        <h1 className="font-normal text-3xl text-sky-900">
          MEMBRESÍA CLUB FARMALEAL
        </h1>
        <div className=" flex flex-row w-screen justify-center gap-20">
          <div className="w-1/3">
            <img src={Membership} />
          </div>
          <div className="w-1/3 text-justify gap-5 flex flex-col">
            <h2 className="text-2xl">Beneficios:</h2>
            <ul className="list-disc">
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
              *El precio de los envíos corre por cuenta del afiliado. CDMX y
              área metropolitana sin costo
            </span>
          </div>
        </div>
        <div className="self-end px-20">
          <button
            onClick={() => setShowModalMembership(true)}
            className="bg-sky-900 text-white px-6 py-4 hover:bg-sky-800 transition duration-200"
          >
            Obtener Membresia
          </button>
        </div>
      </div>
    </>
  );
};
