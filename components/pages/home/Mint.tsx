import { community_wallet, getBalance } from "../../../utils/functions/utils";

function Mint({ balance }: { balance: string }) {
  return (
    <div className="flex flex-col relative items-center  w-full py-24">
      <h2 className="text-[30px] lg:text-7xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
        Buy a Hamster Hero
      </h2>

      <span className="text-xl max-w-3xl text-center py-8">
        Launched on 16th October 2021, all 3,333 Hamster Heroes were sold out
        within 15 hours - one of the most successful launches on the Fantom
        blockchain. You can still buy a Hamster Hero off a secondary market.
      </span>
      
      <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
        <span className="text-gray-800 font-bold text-xl lg:text-2xl">
          <a href="https://paintswap.finance/marketplace/collections/0xe260bed39020f969bd66b4e2ffcc3c5a34b46a41">
            NFTKEY
          </a>
        </span>
      </div>
      
      <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
        <span className="text-gray-800 font-bold text-xl lg:text-2xl">
          <a href="https://paintswap.finance/marketplace/collections/0xe260bed39020f969bd66b4e2ffcc3c5a34b46a41">
            PaintSwap
          </a>
        </span>
      </div>

      {/* <h2 className="text-[30px] lg:text-7xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
        Hamster Heroes DAO
      </h2>
      <span>Current Funds</span>
      <span>{balance} FTM</span> */}
    </div>
  );
}

export default Mint;
