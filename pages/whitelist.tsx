import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  hashToLink,
  metadataFromUri,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Popup from "../components/Popup";

import Footer from "../components/pages/home/Footer";

import Socials from "../components/pages/home/Socials";
import { whitelisted } from "../utils/whitelisted";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const whitlistedUser = isWhiteListed(address);
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

  function isWhiteListed(add: string) {
    const is = whitelisted[add];
    return is;
  }

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

    const addr = await signer.getAddress();
    setAddress(addr);
    setContextState({
      ...contextState,
      addr,
      isLoading: false,
      isConnected: true,
    });
  }

  return (
    <div className="font-skranji bg-beige items-center justify-center flex max-w-[100vw] ">
      <Head>
        <title>Fantom Hamster Heroes | Whitelist </title>
        <meta
          name="description"
          content="Check whether you're whitelisted or not"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center max-w-screen-xl w-full ">
        <nav className="absolute top-0 h-20 flex flex-row items-center justify-between lg:justify-center  w-full px-4 lg:px-20 py-12 ">
          <div className="items-center justify-center">
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
          <div className="flex items-center justify-between lg:justify-end lg:w-full ">
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
        <div className="flex flex-col items-center  pt-44 pb-24 w-full px-4">
          <h2 className="text-[30px] lg:text-5xl text-center lg:text-left text-blackish font-bold leading-relaxed mt-12 lg:mt-0">
            Are You Whitelisted?
          </h2>
          <div className="px-4 lg:px-12 py-4 mt-16 transform -skew-x-12 bg-blackish w-full max-w-xl text-beige">
            <input
              type="text"
              name="address"
              placeholder="Connect Wallet or Enter Wallet Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="outline-none bg-transparent text-xl caret-white w-full placeholder-beige"
            />
          </div>
          {whitlistedUser && (
            <div className="flex flex-col text-center items-center py-12 text-xl w-full">
              <span className="text-blue-600 text-4xl mb-4">
                {whitlistedUser.substr(0, whitlistedUser.length - 5)}
              </span>
              <span className="text-2xl  font-bold text-green-400 mb-4">
                Congratulations! You're whitelisted.
              </span>
              Visit the website duirng the presale to Mint your Hamsters before
              the rest.
            </div>
          )}
          {!whitlistedUser && address != "" && (
            <div className="flex flex-col text-center items-center py-12 text-xl">
              <span className="text-3xl  font-bold text-red-400 mb-8">
                Sorry, you're not whitelisted.
              </span>
              Please head down to our discord server to see if you can be
              whitelisted.
            </div>
          )}
        </div>
        {/* <Marquee /> */}
        <Footer />
      </main>
    </div>
  );
};

export default Home;
