'use client'

import useLaodImage from "@/hooks/useLoadImage";
import { Song } from "@/types"
import Image from "next/image";

export default function MediaItem(
    { data, onClick }:{
        data: Song;
        onClick?: (id: string) => void
    }
) {
    const imageUrl = useLaodImage(data);

    const handleClick = () => {
        if (onClick)
            return onClick(data.id);
      
    }
    return (
        <div
         className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md "
         onClick={handleClick}
         

        >
            <div 
             className="
             relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden
            ">
                <Image 
                 fill
                 src={imageUrl || '/images/liked.png'}
                 alt="Image"
                 className="object-cover"
                />
            </div>
            <div 
            className="
             flex flex-col gap-y-1 overflow-hidden    "
            >
                <p className="text-white">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate"> {data.author} </p>
            </div>
            
        </div>
    )
}