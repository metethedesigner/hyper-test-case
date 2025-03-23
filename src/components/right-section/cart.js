import React from "react";
import { Button, FormLabel } from "@mui/material";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { adjustItemQty } from "../../store/cart/action";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  //Sepette ürün sayısı artırmak için fonksiyon
  const handleIncreaseCart = (cartItem) => {
    dispatch(adjustItemQty(cartItem.id, cartItem.qty + 1));
    toast.success(`${cartItem.title} sayısı başarıyla artırıldı!`);
  };

  //Sepette ürün sayısı azaltmak için fonksiyon
  const handleDecreaseCart = (cartItem) => {
    dispatch(adjustItemQty(cartItem.id, cartItem.qty - 1));
    if (cartItem.qty === 1) {
      toast.warning(`${cartItem.title} başarıyla silindi!`);
    } else {
      toast.success(`${cartItem.title} sayısı başarıyla azaltıldı!`);
    }
  };

  return (
    <>
      <FormLabel>Sepet</FormLabel>
      {cartItems.length === 0 ? (
        <div
          style={{ padding: 10, backgroundColor: "#FFF" }}
          className="shadow-md rounded-md text-center text-blue-600 w-full xs:w-[280px]"
        >
          Sepette ürün yok
        </div>
      ) : (
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
          {cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div className="flex flex-col">
                <span className="text-sm">{item.title}</span>
                <span className="text-sm text-blue-600">{item.price} ₺</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button onClick={() => handleDecreaseCart(item)}>
                  <IoMdRemove />
                </Button>
                <span>{item.qty}</span>
                <Button onClick={() => handleIncreaseCart(item)}>
                  <IoMdAdd />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Cart;
