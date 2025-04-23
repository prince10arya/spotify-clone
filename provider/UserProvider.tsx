'use client'

import { MyUserContextProvider } from "@/hooks/useUser";

export default function UserProvider(
    {
        children,
    }:{ children: React.ReactNode;}
) {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}