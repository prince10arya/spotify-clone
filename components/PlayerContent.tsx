/**
 * PlayerContent Component
 *
 * This component handles the main music player functionality including:
 * - Play/pause controls
 * - Volume control with smooth animations
 * - Next/previous song navigation
 * - Keyboard shortcuts for player controls
 * - Visual feedback for current playback state
 */

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function PlayerContent({
  song,
  songUrl,
}: {
  song: Song;
  songUrl: string;
}) {
  const player = usePlayer();

  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const savedVolume = localStorage.getItem("playerVolume");
      return savedVolume ? parseFloat(savedVolume) : 1;
    }
    return 1;
  });

  const [animatedVolume, setAnimatedVolume] = useState(volume);
  const [lastVolume, setLastVolume] = useState(volume);
  const [isPlaying, setIsPlaying] = useState(false);

  // Save volume to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("playerVolume", volume.toString());
    setAnimatedVolume(volume);
  }, [volume]);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(prevSong);
  };

  // Initialize sound player with callbacks for playback events
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  // Handle sound initialization and cleanup
  useEffect(() => {
    sound?.play();
 
    return () => {
      sound?.unload();
    };
  }, [sound]);


  const handlePlay = () => {
    if (!isPlaying) play();
    else pause();
  };


  const toggleMute = () => {
    const isCurrentlyMuted = volume === 0;
    const targetVolume = isCurrentlyMuted ? lastVolume : 0;

    if (!isCurrentlyMuted) {
      setLastVolume(volume);
    }

    // Animate volume change
    const start = animatedVolume;
    const end = targetVolume;
    const duration = 300;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;

      setAnimatedVolume(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVolume(end);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlay();
          break;
        case "ArrowRight":
          onPlayNext();
          break;
        case "ArrowLeft":
          onPlayPrev();
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((prev) => {
            const newVolume = Math.min(1, prev + 0.1);
            setAnimatedVolume(newVolume);
            return newVolume;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((prev) => {
            const newVolume = Math.max(0, prev - 0.1);
            setAnimatedVolume(newVolume);
            return newVolume;
          });
          break;
        case "KeyM":
          toggleMute();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePlay, onPlayNext, onPlayPrev, toggleMute, volume]);

  // Dynamic icons based on playback state
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume == 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full ">
      <div className="flex w-full justify-start ">
        <div className=" flex items-center gap-x-4 ">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className=" flex md:hidden col-auto w-full justify-end items-center ">
        <div
          className=" h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer  hover:bg-neutral-300 transition "
          onClick={handlePlay}
        >
          <Icon className="text-black" size={25}></Icon>
        </div>
      </div>

      <div
        className="
             hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6
            "
      >
        <AiFillStepBackward
          className=" text-neutral-400 cursor-pointer hover:text-white transition "
          size={30}
          onClick={onPlayPrev}
        />
        <div
          className=" flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer
                 hover:bg-neutral-300 transition "
          onClick={handlePlay}
        >
          <Icon className=" text-black " size={30}></Icon>
        </div>
        <AiFillStepForward
          className=" text-neutral-400 cursor-pointer hover:text-white transition "
          size={30}
          onClick={onPlayNext}
        />
      </div>

      <div className=" hidden md:flex w-full justify-end pr-2 ">
        <div className=" flex items-center gap-x-2 w-[120px] ">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={25}
          />

          <Slider
            value={animatedVolume}
            onChange={(val) => {
              setVolume(val);
              setAnimatedVolume(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
