import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ComicIntroDualBubbles from "@/components/ComicIntro";
import ComicIntroWithNav from "@/components/ComicIntro";

const Page = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black flex items-start md:items-center">
        <ComicIntroWithNav />
      </main>
    </>
  );
};

export default Page;
