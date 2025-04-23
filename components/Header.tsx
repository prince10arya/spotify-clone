"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useModal";
import { useSupabaseClient, } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user, } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if(error)
      toast.error(error.message);
    else
      toast.success("Logged out!");
  };

  const handleRedirect = ( where : string) => {
    router.push(`/${where}`)
  }

  return (
    <div
      className={twMerge(
        `
            h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex justify-between items-center">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => {
              router.back();
            }}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button onClick={() => handleRedirect('')}className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome  className="text-black" size={22} />
          </button>
          <button onClick={() => handleRedirect('search') }  className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={22} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          { user ? (
            <div
             className="flex gap-x-4 items-center"
            >
              <Button
               onClick={handleLogout}
               className="bg-white px-6 py-2"
              >Logout</Button>
              <Button 
               className="hover:bg-white"
               onClick={() => {router.push('/account')}}
              >
                <FaUserAlt/>
              </Button>
            </div>
          ):
          (
            <>
            <div className="">
              <Button
               onClick={authModal.onOpen}
               className="bg-transparent text-neutral-300 font-medium">
                Signup
              </Button>
            </div>
            <div className="">
              <Button             
               className="bg-white px-6 py-2" onClick={authModal.onOpen}>
                Log in
              </Button>
            </div>
          </>
          )
          }
        </div>
      </div>
      {children}
    </div>
  );
}
