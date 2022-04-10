import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  community_wallet,
  getBalance,
  hashToLink,
  metadataFromUri,
  presaleTime,
  saleTime,
  trimAddress,
  trimHash,
} from "../utils/functions/utils";

import { AppContext } from "../context/AppContext";
import Gallery from "../components/pages/home/Gallery";
import Footer from "../components/pages/home/Footer";
import { HAM_ABI, HAM_ADDRESS } from "../utils/contracts/HamContract";

import {
  getPresale,
  getPrice,
  getSale,
  getSupply,
  saleStatus,
} from "../utils/functions/HamFunctions";
import Roadmap from "../components/pages/home/Roadmap";
import Socials from "../components/pages/home/Socials";
import Marquee from "../components/pages/home/Marquee";
import Ham from "../components/pages/home/Ham";

declare let window: any;

const Home: NextPage = () => {
  const { contextState, setContextState } = useContext(AppContext);

  return (
    <div className="font-naomishand bg-beige items-center justify-center flex max-w-[100vw] ">
      <Head>
        <title>Fantom Hamster Heroes</title>
        <meta
          name="description"
          content="Hamster Heroes are a collection of randomly generated NFTs on Fantom"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" min-h-screen flex flex-col items-center justify-center max-w-screen-xl ">
        <nav className="absolute top-0 h-20 flex flex-row items-left justify-between lg:justify-left  w-full px-4 lg:px-20 py-12 ">
          <Link href="/">
            <div className="flex items-center justify-between lg:justify-end lg:w-full">
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Home
                </span>
              </Link>
            </div>
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Roadmap
                </span>
              </Link>
            </div>
            <div className="px-6 py-3 border-2 uppercase border-blackish rounded-md cursor-pointer mr-4">
              <Link href="/hamsters">
                <span className="text-gray-800 font-bold text-xl lg:text-2xl">
                  Collections
                </span>
              </Link>
            </div>
            </div>
          </Link>          
            <Socials />
        </nav>
        <Ham />
        <Marquee />
        <Gallery />
      </main>
    </div>
  );
};

export default Home;
