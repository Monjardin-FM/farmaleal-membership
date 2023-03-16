import React from "react";
import clsx from "clsx";

export const AppFormField = (className, props) => {
  return (
    <div
      className={clsx(
        className,
        "w-full  flex flex-col gap-2 justify-center items-start"
      )}
    >
      {props.children}
    </div>
  );
};
