import React from "react";
import CardBG from "../assets/card-background/credit_card_bg.jpeg";
import CHIPCARD from "../assets/card-asserts/chip.png";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export const Card = ({ cardNumber, cardForm }) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <div className="relative w-4/5">
        <div className="">
          <img src={CardBG} alt="CARDBG" className="rounded-2xl" />
          <div className="absolute w-10 top-5 left-5">
            <img src={CHIPCARD} alt="CHIPCARD" />
          </div>
          <div
            ref={parent}
            className="absolute top-1/3 text-white text-2xl font-bold  w-full h-14 flex flex-col items-center justify-center"
          >
            <div>
              {cardNumber.length === 0 ? "0000 0000 0000 0000" : cardNumber}
            </div>
          </div>
          <div className="absolute bottom-5 text-white text-xs w-full flex flex-row items-start justify-around">
            <div className="flex flex-col">
              <div>Card Holder</div>
              <div>{` ${cardForm.holder_name.toUpperCase()}`}</div>
            </div>
            <div>
              <div>Expiration</div>
              {cardForm.expiration_month.length === 0 ? (
                <div>{`MM / YY`}</div>
              ) : (
                <div>{`${cardForm.expiration_month} / ${cardForm.expiration_year}`}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
