import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[800px]">
      <p className="text-3xl">Böyle bir sayfa mevcut değil.</p>
      <Link to="/" className="flex flex-row mt-4 hover:text-blue-500">
        <p className="text-xl">Ana Sayfaya Dön</p>
        <AiOutlineArrowRight className="ml-1 mt-1.5" size={18} />
      </Link>
    </div>
  );
};

export default NotFound;
