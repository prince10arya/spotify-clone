import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import SupaBaseProvider from "@/provider/SupabaseProvider";
import UserProvider from "@/provider/UserProvider";
import ModalProvider from "@/provider/ModerProvider";
import ToasterProvider from "@/provider/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen to music",
  icons: {
    icon: '/music-svgrepo-com.svg',
  },
};


export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
     
      <body className={`${font.variable} antialiased`}>
        <ToasterProvider/>
        <SupaBaseProvider>
          <UserProvider>
            <ModalProvider/>
            <SideBar songs={userSongs} >{children}</SideBar>
            <Player/>
          </UserProvider>
        </SupaBaseProvider>
      </body>
    </html>
  );
}
