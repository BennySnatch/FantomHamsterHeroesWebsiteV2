import React from "react";
var set1: any = [];
var set2: any = [];
var set3: any = [];
for (var i = 0; i < 10; i++) {
  set1.push(
    <div className="w-32 h-32" key={i}>
      <img src={"/assets/images/hamsters/" + i + ".jpg"} alt="" />
    </div>
  );
  set2.push(
    <div className="w-32 h-32" key={i}>
      <img src={"/assets/images/hamsters/" + (i + 10) + ".jpg"} alt="" />
    </div>
  );
  set3.push(
    <div className="w-32 h-32" key={i}>
      <img src={"/assets/images/hamsters/" + (i + 20) + ".jpg"} alt="" />
    </div>
  );
}

function Marquee() {
  return (
    <div className="w-screen overflow-hidden flex">
      <div className="flex mark">
        <div className="flex flex-col">
          <Set1 />
          <Set2 />
          <Set3 />
        </div>
      </div>

      <div className="flex mark">
        <div className="flex flex-col">
          <Set1 />
          <Set2 />
          <Set3 />
        </div>
      </div>

      <div className="flex mark">
        <div className="flex flex-col">
          <Set1 />
          <Set2 />
          <Set3 />
        </div>
      </div>

      {/* <div className="flex mark">
        <div className="flex flex-col">
          <Set1 />
          <Set2 />
          <Set3 />
        </div>
      </div>

      <div className="flex mark">
        <div className="flex flex-col">
          <Set1 />
          <Set2 />
          <Set3 />
        </div>
      </div> */}
    </div>
  );
}

export default Marquee;

function Set1() {
  return <div className="flex flex-shrink-0">{set1}</div>;
}
function Set2() {
  return <div className="flex ">{set2}</div>;
}
function Set3() {
  return <div className="flex ">{set3}</div>;
}
