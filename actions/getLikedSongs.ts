import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, } from "next/headers";

const getLikedSongs
 = async (): Promise<Song[]> => {

    const cookieStore = await cookies();

    const supaBase = createServerComponentClient(
        {
            cookies: () => cookieStore,
        }
    );

    const { data: {user}, error: userError } = await supaBase.auth.getUser();

    if(userError || !user)
        {
         console.log(userError?.message || 'No authenticated user found.' );
         return [];
        }


    const { data, error } = await supaBase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', user?.id)
        .order('created_at',{ascending: false});
    
    if (error)
    {
        console.log(error);
        return [];
    }

    if (!data)
        return [];

    return data.map((item) => ({
        ...item.songs
      
    }));
};
export default getLikedSongs
;
