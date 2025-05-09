import useAuthModal from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({ songId }: { songId: string }) {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("songs_id", songId)
        .single();

      if (!error && data) setIsLiked(true);
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  const handleClick  = async ()  => {
    if (!user) return authModal.onOpen();
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("songs_id", songId);

        if(error)
            toast.error(error.message);
        else {
          setIsLiked(false);
          toast.success("Disliked!")
        }



    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        songs_id: songId,
        user_id: user.id,
      });

      if (error)
        toast.error(error.message);
      else{
        setIsLiked(true);
        toast.success("Liked!")
      }
    }

    router.refresh();
  };

  return (
    <button onClick={handleClick} className=" cursor-pointer hover:opacity-70 hover:scale-140 ">
      <Icon color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
}
