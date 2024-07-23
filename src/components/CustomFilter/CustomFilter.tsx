"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, options }: CustomFilterProps) => {

  const router = useRouter();

  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: { title: string, value: string}) => {


    const newPathName = updateSearchParams(title, e.value.toLowerCase())

    // const searchParams  = new URLSearchParams(window.location.search);

    // searchParams.set(type, value)

    // const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathName, {scroll: false})
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton
            className="custom-filter__btn"
          >
            <span className="block truncate">{selected.title}</span>
            <Image src="/chevron-up-down.svg" alt="chevron up down" width={20} height={20} className="ml-4 object-contain" />
          </ListboxButton>

          <Transition
            as={Fragment}  // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options?.map((option) => (
                <ListboxOption key={option.title} value={option} 
                  className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? "bg-blue-500 text-white" : "text-gray-900"}`}
                >
                  {( selected ) => ( 
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {option.title}
                      </span>
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter
