import React from "react";
import { Link } from "react-router-dom";
import BackIcon from "icons/common/back.svg";

export default function Back({ style, children }) {
  return (
    <section className={`${style} mb-2`}>
      <div className="container px-2 pt-4">
        <div className="flex">
          <Link to="/" className="w-6 h-6 ml-2">
            <img
              className="w-full h-full object-contain"
              src={BackIcon}
              alt="back icon"
            />
          </Link>
          <h1 className="text-base text-white font-dana-regular">{children}</h1>
        </div>
      </div>
    </section>
  );
}
