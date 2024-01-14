import React from "react";

export const Button = ({
  onClick,
  text,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
}) => {
  return (
    <button {...props} onClick={onClick} className="button" type="button">
      {text}
    </button>
  );
};
