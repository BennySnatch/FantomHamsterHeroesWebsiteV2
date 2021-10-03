import React from "react";

export default function Gallery() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end py-20 max-w-screen px-4">
      <div className="flex flex-col flex-1 py-8 lg:pr-0">
        <h2 className="text-[35px] lg:text-6xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
          Attributes
        </h2>

        <div className="mt-8 text-xl">
          The Hamster Heroes metadata are stored on IPFS, a permanent
          decentralised data storage. Each hamster is generated from over 70
          possible traits over 6 layers, some rarer than the others. To pay
          homage to the most popular game on Fantom, Rarity Game, 11 Hamster
          Heroes have taken on their classes as Barbarian, Bard, Cleric, Druid,
          Fighter, Monk, Paladin, Ranger, Rogue, Sorcerer to rally the Hamster
          Army. They are differentiated by wearing a Class Hat and a Class
          Weapon and have their heads bobbing. This is because they’re cute and
          they are only allowed to do cute stuff, you know? Their goal is to
          start the Bobbing Hamster Heads Revolution.
        </div>
      </div>

      <div className=" flex items-center justify-center lg:justify-end flex-1">
        <div className=" grid grid-cols-1 lg:grid-cols-2 mt-16 lg:mt-0  ml-0 lg:ml-8">
          <div className="lg:w-60">
            <img
              className=""
              src="/assets/images/bobbing/Bobbing_Bard.gif"
              alt=""
            />
          </div>
          <div className="lg:w-60">
            <img
              className=""
              src="/assets/images/bobbing/Bobbing_Druid.gif"
              alt=""
            />
          </div>
          <div className="lg:w-60">
            <img
              className=""
              src="/assets/images/bobbing/Bobbing_Fighter.gif"
              alt=""
            />
          </div>
          <div className="lg:w-60">
            <img
              className=""
              src="/assets/images/bobbing/Bobbing_Rogue.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
