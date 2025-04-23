import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {

    const cookieStore = await cookies();

    const supaBase = createServerComponentClient(
        {
            cookies: () => cookieStore,
        }
    );
 
    if (!title)
    {
        const allSongs = await getSongs();
        return  allSongs;
    }



    const { data, error } = await supaBase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at',{ascending: false});
    
    if (error)
        console.log(error);

    return data ?? [];



};
export default getSongsByTitle;
