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
        <h2 className="text-3xl lg:text-4xl font-bold text-blackish/80 uppercase mt-8">
          Fantom
        </h2>
        <h1 className="text-[30px] lg:text-7xl font-bold  acme lg:text-left text-blackish mb-8">
          Hamster Heroes
        </h1>
        <span className="text-lg font-semibold text-gray-700 leading-relaxed lg:text-left">
          Fantom Hamster Heroes is a collection of 3333 uniquely and randomly
          generated NFTs stored on the Fantom Blockchain. They watch apes, dogs,
          cats, and birds get released out of their cages and felt their
          cuteness wasn’t appreciated on the blockchain. To find owners to adopt
          them, they’ve decided… TO GO HAM ON EVERYTHING!
        </span>
      </div>
    </div>
  );
}

export default Hero;
