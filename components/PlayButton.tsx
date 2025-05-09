import { FaPlay } from "react-icons/fa";

export default function PlayButton() {
    return (
        <button className="
         transition opacity-0 rounded-full flex items-center bg-green-500 p-3 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 c
        ">  
            <FaPlay/>
        </button>
    )
}