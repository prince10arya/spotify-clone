'use client'

import type { InputHTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string;
    disabled: boolean;

}


export default function Input(
    {  type, disabled, ...props}: InputProps, ref:Ref<HTMLInputElement>

) {
    return (
        <input         
        type={type}
         className={twMerge(`
            flex
            w-full
            rounded-md
            bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none
            `)}
            disabled={disabled}
            ref={ref}
            {...props}

          />
    )
}