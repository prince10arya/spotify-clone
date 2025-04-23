"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

export default function SearchContent({ songs = [] }: { songs: Song[] }) {

  const onPlay = useOnPlay(songs);
  if (songs.length === 0)
    return (
      <div className=" flex flex-col gap-y-2 w-full px-6 text-neutral-400 ">
        No songs found
      </div>
    );

  return (
    <div className=" flex flex-col gap-y-2 w-full px-6 ">
      {songs.map((song) => {
        return (
          <div
            className="
                     flex items-center gap-4 w-full "
            key={song.id}
          >
            <div className=" flex-1 ">
                <MediaItem 
                 onClick={(id: string) => onPlay(id)}
                 data={song}
                />
            </div>
            {  /* //TODO: Add Like Button here */  }
            <LikeButton songId={song.id} />


          </div>
        );
      })}
    </div>
  );
}
