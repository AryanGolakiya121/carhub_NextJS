"use client";

import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import SearchButton from "./SearchButton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {

  const router = useRouter();
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState("")

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(manufacturer.trim() === "" && model.trim() === ""){
      return alert("Please fill in the search bar")
    }
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams  = new URLSearchParams(window.location.search);

    if(model){
      searchParams.set('model', model)
    }else{
      searchParams.delete('model')
    }

    if(manufacturer){
      searchParams.set('manufacturer', manufacturer)
    }else{
      searchParams.delete('manufacturer')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname, { scroll: false }) 
  }
  return (
    <form className="searchbar" onSubmit={handleSearch} >
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        <SearchButton otherClasses="sm:hidden"/>
      </div>

      <div className="searchbar__item">
          <Image src="/model-icon.png" alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4"  />

          <input 
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="GTI"
            className="searchbar__input"
          />
          <SearchButton otherClasses="sm:hidden" />
      </div>

      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
