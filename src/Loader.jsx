import React from "react";
import { BeatLoader } from "react-spinners";

export const Loader = ({ text }) => {
  return (
    <div className="absolute z-50 w-full min-h-full flex flex-col justify-center items-center">
      <div className="w-52 h-24 bg-slate-700 bg-opacity-30 flex flex-col justify-center items-center rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg gap-5 ">
        <BeatLoader color="#15A186" />
        <div className="text-white text-xl font-semibold">{text}</div>
      </div>
    </div>
  );
};
