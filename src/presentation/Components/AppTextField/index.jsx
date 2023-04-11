import clsx from "clsx";
import React from "react";

export const AppTextField = ({
  placeholder,
  dataOpenCard,
  name,
  onChange,
  value,
  className,
  disabled = false,
  type = "text",
  onBlur,
  onFocus,
}) => {
  return (
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      min={0}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      data-openpay-card={dataOpenCard}
      name={name}
      value={value}
      onChange={onChange}
      className={clsx(
        className,
        "h-8 rounded-md border border-slate-300 p-2 text-sm "
      )}
    />
  );
};
