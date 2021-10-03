type Meta = {
  name: string;
  description: string;
  image: string;
  id: string | number;
};

function NFTCard({ meta }: { meta: Meta }) {
  return (
    <div>
      <div className="bg flex rounded-2xl flex-col items-center justify-evenly text-white text-xl py-8 px-4 space-y-4 border-8 border-purple-900 max-w-[400px]">
        <div>
          <span className="text-3xl text-left text-yellow-400 font-bold mr-3">
            #{meta.id}
          </span>
          <span className="font-bold">{meta.name}</span>
        </div>
        <img className="h-72 rounded" src={meta.image} alt="" />
        <div className="text-sm ">
          {meta.description.split("\n").map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
