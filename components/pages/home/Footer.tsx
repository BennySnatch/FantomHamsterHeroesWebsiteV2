import React from "react";
import { socialdata } from "./social.data";

function Footer() {
  return (
    <div className="flex flex-row justify-center items-center py-12 space-x-3 lg:space-x-12  w-full ">
      <span className="text-lg lg:text-2xl text-blackish uppercase cursor-pointer hover:text-gray-700">
        <a href={socialdata[0].link} rel="noreferrer" target="_blank">
          {socialdata[0].name}
        </a>
      </span>
      <span className="text-lg lg:text-2xl text-blackish uppercase cursor-pointer hover:text-gray-700">
        <a href={socialdata[1].link} rel="noreferrer" target="_blank">
          {socialdata[1].name}
        </a>
      </span>
      <span className="text-lg lg:text-2xl text-blackish uppercase cursor-pointer hover:text-gray-700">
        <a href={socialdata[2].link} rel="noreferrer" target="_blank">
          {socialdata[2].name}
        </a>
      </span>
    </div>
  );
}

export default Footer;
