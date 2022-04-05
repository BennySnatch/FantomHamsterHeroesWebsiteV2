import React from "react";

const roadMapData = [
  {
    amt: 10,
    info: "<b>Holder Incentives<\b>: AMAs, games, and giveaways for holders.",
  },
  {
    amt: 15,
    info: "Verify all holders on Discord to form the DAO and make the first proposal on Snapshot (a voting system) with the funds from the community wallet.",
  },
  {
    amt: 20,
    info: "Smashing.",
  },
  {
    amt: 25,
    info: "Delicious.",
  },
  {
    amt: 50,
    info: "Have all 3,333 NFTs attributes visible on the new Fantom wallet with rarity rank displayed on website.",
  },
  {
    amt: 75,
    info: "Exclusive merchandise for Hamster Heroes holders.",
  },
];

function RoadmapItem({
  amt,
  info,
  index,
}: {
  amt: number;
  info: string;
  index: number;
}) {
  return (
    <div className="flex items-center w-full ">
      <div className=" flex border-l-0 border-blackish">
        <div className="flex items-center justify-center">
          <span className="text-blackish text-xl lg:text-2xl w-24 mx-2 flex items-center justify-center border-2 border-blackish bg-purple-400">
            Phase {index + 1}
          </span>
        </div>
        <span className="text-blackish text-sm lg:text-lg ml-4  w-full">
          {info}
          {index == 1 && (
            <a
              className="text-purple-500 ml-4 "
              href="https://medium.com/@fantomhamsterheroes"
            >
              Learn More..
            </a>
          )}
        </span>
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 max-w-screen ">
      <h2 className="text-[35px] lg:text-7xl text-center lg:text-left text-blackish font-bold leading-relaxed mb-20">
        Roadmap
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <div className=" flex items-center justify-center w-full mb-16 lg:mb-0">
          <div className="lg:w-96 p-2 bg-blackish rounded">
            <img
              className="rounded"
              src="/assets/images/Hamster-DAO.png"
              alt=""
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8  px-4">
          {roadMapData.map((item, index) => (
            <RoadmapItem
              amt={item.amt}
              info={item.info}
              key={index}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
