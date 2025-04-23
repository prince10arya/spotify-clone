import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLaodImage = (song: Song) => {
    const supaBaseClient = useSupabaseClient();
    
    if (!song) return null;

    const {data: imageData} = supaBaseClient
     .storage
     .from('images')
     .getPublicUrl(song.image_path);

    return imageData.publicUrl;

}
export default useLaodImage;


