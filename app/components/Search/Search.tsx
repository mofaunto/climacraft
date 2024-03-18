"use client";

import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";

import { commandIcon } from "@/app/utils/Iconcollection";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

const Search = () => {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHoveredIndex((prevIndex) =>
        Math.min(prevIndex + 1, geoCodedList.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoveredIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selectedItem = geoCodedList[hoveredIndex];
      if (selectedItem) {
        getClickedCoords(selectedItem.lat, selectedItem.lon);
      }
    }
  };

  return (
    <div className='search-container'>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='w-full border inline-flex items-center justify-between text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200'
          >
            <p className='text-sm text-muted-foreground'>Search Here...</p>
            <div className='command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
              {commandIcon}
              <span className='text-[12px]'>F</span>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className='p-0'>
          <Command className='rounded-lg border shadow-md'>
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              onKeyDown={handleKeyDown}
              placeholder='Type a command or search...'
            />
            <CommandList>
              <ul className='px-3 pb-2'>
                <p className='p-2 text-sm text-muted-foreground'>Suggestions</p>
                {geoCodedList?.length === 0 ||
                  (!geoCodedList && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  ))}

                {geoCodedList &&
                  geoCodedList.map(
                    (
                      item: {
                        name: string;
                        country: string;
                        lat: number;
                        lon: number;
                      },
                      index: number
                    ) => {
                      const { country, name } = item;
                      return (
                        <li
                          key={index}
                          onMouseEnter={() => setHoveredIndex(index)}
                          className={`py-3 px-2 text-sm rounded-sm cursor-default
                    ${hoveredIndex === index ? "bg-accent" : ""}
                  `}
                          onClick={() => {
                            getClickedCoords(item.lat, item.lon);
                          }}
                        >
                          <p className='text'>
                            {name}, {country}
                          </p>
                        </li>
                      );
                    }
                  )}
              </ul>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
