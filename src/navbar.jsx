import React from "react";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";

export const Navbar = () => {
  return (
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
  );
};
