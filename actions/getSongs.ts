import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, } from "next/headers";

const getSongs = async (): Promise<Song[]> => {

    const cookieStore = await cookies();

    const supaBase = createServerComponentClient(
        {
            cookies: () => cookieStore,
        }
    );
    const { data, error } = await supaBase
        .from('songs')
        .select('*')
        .order('created_at',{ascending: false});
    
    if (error)
        console.log(error);

    return data ?? [];



};
export default getSongs;
