"use client";

import { Database } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function SupaBaseProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => 
    createClientComponentClient<Database>()
  );

  return(
    <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
    </SessionContextProvider>
  )
}
