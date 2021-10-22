import React from "react";
import {
  getId,
  getImage,
  getRank,
  getScore,
} from "../utils/functions/HamFunctions";
import { trimImageURI } from "../utils/functions/utils";
import { finalmeta } from "../utils/traitsfinal";

function HamsterView(ham: any) {
  return (
    <div className="bg-blackish relative rounded p-2 max-w-xs" key={ham}>
      <div className=" flex items-center w-full  py-1 text-beige text-center text-3xl  ">
        <span className="text-2xl ">Rank </span>
        <span className="text-2xl ml-2">#{getRank(ham)}</span>
      </div>
      <div className="min-h-[150px]">
        {ham <= 11 && (
          <img
            src={trimImageURI(finalmeta[ham].image) + `.gif`}
            alt={`Hamster Heroes #${ham}`}
            className="place"
          />
        )}
        {ham > 11 && (
          <img
            src={trimImageURI(finalmeta[ham].image) + `.jpg`}
            alt={`Hamster Heroes #${ham}`}
            className="place"
          />
        )}
      </div>

      <div className="flex w-full justify-between px-2 py-4">
        <div className="flex  justify-center flex-col">
          <div className=" text-beige text-lg">
            Hamster Heroes
            <span className=" text-lg"> #{ham}</span>
          </div>

          <div className=" text-beige text-xl">
            Score:
            <span className="ml-4 text-2xl">{getScore(ham)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HamsterView;
