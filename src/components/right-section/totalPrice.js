import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TotalPrice = () => {
  const cartTotal = useSelector((state) => state.cart.cartTotalAmount);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFF",
        }}
        className="shadow-md rounded-md w-full xs:w-[280px]"
      >
        <div className="flex gap-2 p-2 font-medium">
          Total Price:
          <span className="text-blue-600">{cartTotal}</span>
        </div>
        <Link
          to="/sepet"
          className="bg-blue-600 py-2 rounded-md text-gray-50 hover:bg-blue-800 flex items-center justify-center"
        >
          Checkout
        </Link>
      </div>
    </>
  );
};

export default TotalPrice;
