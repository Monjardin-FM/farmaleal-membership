import React, { useEffect, useState } from "react";

import Membership from "./assets/img/membresia.png";
import { ModalPayment } from "./ModalPayment";
import { Navbar } from "./navbar";
import { Menu } from "./Menu";
import { ModalVerificationCard } from "./ModalVerificationCard";
import { MembershipInfo } from "./MembershipInfo";
export const App = () => {
  const [showModalMembership, setShowModalMembership] = useState(false);
  const [showModalVerificationCard, setShowModalVerificationCard] =
    useState(false);
  const nextForm = () => {
    setShowModalVerificationCard(false);
    setShowModalMembership(true);
  };
  return (
    <>
      <ModalPayment
        isVisible={showModalMembership}
        onClose={() => setShowModalMembership(false)}
      />
      <ModalVerificationCard
        isVisible={showModalVerificationCard}
        onClose={() => setShowModalVerificationCard(false)}
        nextForm={nextForm}
      />

      <div className="flex flex-col justify-center items-center gap-7 mb-5 overflow-hidden">
        <Navbar />
        <Menu />

        <hr className="w-full" />
        <MembershipInfo />
        <div className="self-end px-20">
          <button
            onClick={() => setShowModalVerificationCard(true)}
            className="bg-sky-900 text-white px-6 py-4 hover:bg-sky-800 transition duration-200"
          >
            Obtener Membresia
          </button>
        </div>
      </div>
    </>
  );
};
