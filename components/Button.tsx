"use client";

import React from "react";
import type { ButtonHTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function Button(
  { className = "", children, type = "button", disabled, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={twMerge(
        `w-full rounded-full bg-green-500 border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
