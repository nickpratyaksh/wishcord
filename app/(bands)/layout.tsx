"use client";

import { useContext, useEffect } from "react";
import BandSection from "../ui/Componenets/BandsSection";
import { Context } from "../lib/Context";
import { darkTheme, lightTheme } from "../ui/themes";
import { ThemeSetter } from "../ui/ThemeSetter";
import { notFound, usePathname } from "next/navigation";
import MainPage from "../ui/Componenets/MainPage";
import axios from "axios";
import { bands_list } from "../lib/data";

export default function Layout({ children }: { children: React.ReactNode }) {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://bandmade.vercel.app/";

  let { current_theme, changeTheme } = useContext(Context);

  if (typeof window !== "undefined") {
    ThemeSetter();
  }

  let path = usePathname();
  if (
    path != "/" &&
    bands_list.find(
      (band) =>
        band.name ===
        path
          .slice(1)
          .slice(
            0,
            path.lastIndexOf("/") === 0
              ? path.length
              : path.lastIndexOf("/") - 1
          )
    ) == undefined
  ) {
    return notFound();
  }
  console.log();

  return (
    <div className="flex">
      <BandSection />
      <div className="flex flex-col h-screen w-full">
        <div
          onClick={() => {
            changeTheme(current_theme == lightTheme ? darkTheme : lightTheme);
            localStorage.setItem(
              "saved_theme",
              JSON.stringify(
                current_theme == lightTheme ? darkTheme : lightTheme
              )
            );
          }}
          className={`${current_theme.highlight} h-8 text-white text-center
        font-bold flex flex-col justify-center cursor-pointer`}
        >
          Bandmade
        </div>
        <div className={`flex h-full ${current_theme.secondary_light}`}>
          {path == "/" ? <MainPage /> : <>{children}</>}
        </div>
      </div>
    </div>
  );
}
