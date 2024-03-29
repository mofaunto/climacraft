"use client";

import React from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Search from "./Search/Search";
import { useGlobalContext } from "../context/globalContext";

const Navbar = () => {
  const { state } = useGlobalContext();
  return (
    <div className='w-full flex items-center justify-between py-4'>
      <div className='left'></div>
      <div className='search flex shrink-0 w-full gap-2 sm:w-fit'>
        <div className='flex w-full items-center gap-2'>
          <Search />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
