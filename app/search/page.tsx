import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";



const Search = async (
    {searchParams,}:{
        searchParams:Promise<{
            title: string;
        }>
    }
) => {


    const { title } = await searchParams;
    const songs = await getSongsByTitle(title);


    return (
        <div
         className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
        >
            <Header
             className="
              from-bg-neutral-900
             "
            >
                <div 
                className="
                 mb-2 flex flex-col gap-y-6
                ">
                    <h1 className=" text-white text-3xl font-semibold ">Search</h1>
                    <SearchInput/>
                </div>
            </Header>
            <SearchContent songs={songs} ></SearchContent>
        </div>

    )
}

export default Search;