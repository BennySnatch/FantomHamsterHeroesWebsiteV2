import React from "react";
import { getImage } from "../utils/functions/HamFunctions";
import { finalmeta } from "../utils/traitsfinal";

function HamsterView(ham: any) {
  return (
    <div className="bg-blackish relative">
      <div>
        <img src={getImage(ham)} alt="" />
      </div>
      <div className="py-4 px-2 text-beige text-center text-3xl">
        Hamster Heroes
        <span className=" text-3xl"> #{ham}</span>
      </div>
    </div>
  );
}

export default HamsterView;
