'use client'

import useGetSongsById from "@/hooks/useGetSongsById";
import useLoadSongUrls from "@/hooks/useLoadSongs";

import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./PlayerContent";

export default function Player() {

    const player = usePlayer();
    const { song  } = useGetSongsById( player.activeId);

    const songUrl = useLoadSongUrls( song! )

    if (!song || !songUrl || !player.activeId)
        return null;
    
    return (
        <div
         className=" fixed bottom-0 bg-black w-full py-2 h-[80px] px-4 "
        >
            <PlayerContent key={songUrl} song={song} songUrl={songUrl}
            />
        </div>
    )
}