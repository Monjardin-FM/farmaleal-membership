import React from "react";
import { useSearchParams } from "react-router-dom";

export const Verification = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("token");
  return (
    <div className="w-screen h-screen bg-slate-800 text-white flex flex-col items-center justify-center">
      Verification
      <div>{email}</div>
    </div>
  );
};
