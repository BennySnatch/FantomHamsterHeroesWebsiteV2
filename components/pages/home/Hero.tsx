import React from "react";

function Hero() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center px-8 md:px-12 mt-12 pt-24 pb-12">
      <div className=" flex items-center ">
        <div className="lg:w-96">
          <img className="rounded" src="/assets/images/hamsters.gif" alt="" />
        </div>
      </div>

      <div className="flex-col flex  lg:pl-20">
        {/* text-[#1969ff] */}
        <h1 className="text-[30px] lg:text-7xl font-bold  acme lg:text-left text-blackish mb-8">
          Fantom Hamster Heroes
        </h1>
        <span className="text-lg font-semibold text-gray-700 leading-relaxed lg:text-left">
          Fantom Hamster Heroes is a collection of 3333 uniquely and randomly
          generated NFTs stored on Fantom.
        </span>
      </div>
    </div>
  );
}

export default Hero;
