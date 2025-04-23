"use client";

import './css/library.css'
import useAuthModal from "@/hooks/useModal";
import useUploadModal from "@/hooks/useUploads";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useOnPlay from '@/hooks/useOnPlay';

export default function Library({ songs = [] }: { songs: Song[] }) {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const handleScroll = () => {
      if (scrollContainer) {
        setScrolled(scrollContainer.scrollTop > 10); // check scroll of the div, not window
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onPlay  = useOnPlay(songs);

  const onClick = () => {
    if (!user) return authModal.onOpen();
    return uploadModal.onOpen();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sticky Header */}
      <div
        className={clsx(
          "sticky top-0 px-5 pt-4 pb-2 bg-neutral-900 transition-shadow duration-250",
          scrolled && "z-10 library-shadow"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-x-2">
            <TbPlaylist size={23} className="text-neutral-400" />
            <p
              className={clsx(
                "font-medium text-md transition-colors",
                scrolled ? "text-white" : "text-neutral-400"
              )}
            >
              Your Library
            </p>
          </div>
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      {/* Scrollable List with Ref */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 mt-2 space-y-2"
      >
        {songs.map((song) => (
          <MediaItem onClick={(id:string) => onPlay(id)} key={song.id} data={song} />
        ))}
      </div>
    </div>
  );
}
