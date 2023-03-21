import React from "react";
import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Verification } from "./Verification";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/membresiaClubFarmaleal" element={<App />} />
      <Route path="/verificationMembership/" element={<Verification />} />
    </Routes>
  );
};
//http://localhost:5173/verificationMembership/?token=robertomonjardin@gmai
