import React from "react";

export default function Background() {
  return (
    <div className="bg-bg-gradient-to-custom fixed top-0 left-0 w-screen h-screen -z-1">
      <div className="w-[312px] h-[274px] bg-[#cc304b] -left-[100px] -top-[40px] blur-[50px] opacity-25 absolute"></div>
      <div className="w-[340px] h-[274px] bg-[#ffc23a] -right-[150px] -bottom-[100px] blur-[50px] opacity-25 absolute"></div>
    </div>
  );
}
