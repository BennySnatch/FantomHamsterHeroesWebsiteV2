import React from "react";

function HamCard({ topic, desc }: { topic: string; desc: string }) {
  return (
    <div className="px-4 py-6 bg-blackish text-beige flex flex-col space-y-8 items-center justify-between max-w-[300px] transform -skew-x-12">
      <div className="flex flex-col">
        <span className="text-3xl font-bold uppercase mb-8">
          They Go Ham On
        </span>
        <span className="text-4xl font-bold uppercase text-purple-400">
          {topic}
        </span>
      </div>
      <div className="flex items-center justify-center h-full">
        <span className="text-xl font-bold capitalize ">{desc}</span>
      </div>
    </div>
  );
}

function Ham() {
  return (
    <div className="flex items-center justify-center flex-col py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 text-center gap-8">
        <HamCard topic="Supply" desc="with only 3,333 furry creatures." />
        <HamCard topic="Price" desc="at 50 FTM without bonding curve." />
        <HamCard
          topic="Community"
          desc="with 50% of sales and royalties going to a community wallet."
        />
      </div>
    </div>
  );
}

export default Ham;
