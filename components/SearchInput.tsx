'use client'

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation"
import  qs from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";


export default function SearchInput() {

    const router = useRouter();

    const [value, setValue] = useState<string>("")
    const debounceValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debounceValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query,
        })
        router.push(url);
      
    }, [debounceValue, router,])
    



    return (
        <Input
         placeholder="Search"
         value={value}
         onChange={(e)=>setValue(e.target.value)}
        />
    )

}