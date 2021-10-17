import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  hashToLink,
  metadataFromUri,
  presaleTime,
  saleTime,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Popup from "../components/Popup";
import Hero from "../components/pages/home/Hero";
import Mint from "../components/pages/home/Mint";
import Gallery from "../components/pages/home/Gallery";
import Footer from "../components/pages/home/Footer";
import { HAM_ABI, HAM_ADDRESS } from "../utils/contracts/HamContract";

import {
  getOwnedIDs,
  getRank,
  getRarity,
  getScore,
} from "../utils/functions/HamFunctions";
import Socials from "../components/pages/home/Socials";
import { finalmeta } from "../utils/traitsfinal";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);
  const [myHams, setMyHams] = useState([]);

  useEffect(() => {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    connectWallet();
    window.ethereum.on("accountsChanged", () => {
      connectWallet();
    });

    window.ethereum.on("chainChanged", () => {
      document.location.reload();
    });
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      window.alert("You must install MetaMask to use this website");
      return;
    }
    setContextState({ ...contextState, isLoading: true });
    let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let network = await provider.getNetwork();
    await provider.send("eth_requestAccounts", []);

    if (network.chainId != 250) {
      window.alert("Switch to Fantom to continue");
      setContextState({ ...contextState, isFantom: false, isConnected: true });
      return;
    }

    let signer = provider.getSigner();
    const hamContract = new ethers.Contract(HAM_ADDRESS, HAM_ABI, provider);
    const hamContractSigner = new ethers.Contract(HAM_ADDRESS, HAM_ABI, signer);

    const addr = await signer.getAddress();

    const ownedIds = await getOwnedIDs(hamContract, addr);
    const [rank, score] = getRarity(12);
    setMyHams(ownedIds);

    setContextState({
      ...contextState,
      addr,
      isLoading: false,
      isConnected: true,
      hamContract,
      hamContractSigner,
    });
  }

  return (
    <div className="font-skranji bg-beige items-center justify-center flex max-w-[100vw] ">
      <Head>
        <title>My Hamsters </title>
        <meta name="description" content="View all your Hamsters" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center max-w-screen-xl ">
        <nav className="absolute top-0 h-20 flex flex-row items-center justify-between lg:justify-center  w-full px-4 lg:px-20 py-12 ">
          <Link href="/">
            <div className="items-center justify-center cursor-pointer">
              <img
                className="h-12 hidden lg:flex"
                src="/assets/images/logo.png"
                alt=""
              />
              <img
                className="h-16 lg:hidden"
                src="/assets/images/FantomHAM_LOGO.png"
                alt=""
              />
            </div>
          </Link>
          <div className="flex items-center justify-between lg:justify-end lg:w-full ">
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  HAM
                </span>
              </Link>
            </div>
            <div
              className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer"
              onClick={() => connectWallet()}
            >
              <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                {contextState.addr != ""
                  ? trimAddress(contextState.addr)
                  : "Connect"}
              </span>
            </div>

            <Socials />
          </div>
        </nav>
        <div className="flex flex-col flex-1 mt-24 px-4">
          <div className="text-4xl font-bold text-blackish text-center mb-8">
            My Hamster Heroes
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {myHams.map((ham, index) => (
              <div className="bg-blackish relative rounded" key={index}>
                <div>
                  <img
                    src={finalmeta[ham].image}
                    alt={`Hamster Heroes #${ham}`}
                  />
                </div>

                <div className="flex w-full justify-between px-2">
                  <div className="flex  justify-center flex-col">
                    <div className=" text-beige text-xl">
                      Hamster Heroes
                      <span className=" text-2xl"> #{ham}</span>
                    </div>

                    <div className=" text-beige text-xl">
                      Score:
                      <span className="ml-4 text-2xl">{getScore(ham)}</span>
                    </div>
                  </div>
                  <div className=" flex items-center justify-center py-4 px-2 text-blackish text-center text-3xl  ">
                    <div className="flex flex-col ml-4 text-3xl py-1 px-4 bg-beige rounded">
                      <span className="text-3xl bg-beige">{getRank(ham)}</span>
                      <span className="text-lg">RANK</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
