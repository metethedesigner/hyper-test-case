import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  adjustItemQty,
  clearCart,
  removeFromCart,
} from "../../store/cart/action";
import { toast } from "react-toastify";

const ShopCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotalAmount);

  //Sepetten silme fonksiyonu
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem.id));
    toast.warning(`${cartItem.title} başarıyla silindi!`);
  };

  //Sepette ürün sayısı artırma fonksiyonu
  const handleIncreaseCart = (cartItem) => {
    dispatch(adjustItemQty(cartItem.id, cartItem.qty + 1));
    toast.success(`${cartItem.title} sayısı başarıyla artırıldı!`);
  };

  //Sepette ürün sayısı azaltma ve silme fonksiyonu
  const handleDecreaseCart = (cartItem) => {
    dispatch(adjustItemQty(cartItem.id, cartItem.qty - 1));
    if (cartItem.qty === 1) {
      toast.warning(`${cartItem.title} başarıyla silindi!`);
    } else {
      toast.success(`${cartItem.title} sayısı başarıyla azaltıldı!`);
    }
  };

  //Sepetteki ürünleri tamamen silme fonksiyonu
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success(`Tüm sepet başarıyla temizlendi!`);
  };

  return (
    <>
      {cartItems?.length === 0 ? (
        <div className="w-full h-[600px] flex flex-col justify-center items-center my-40">
          <div className="text-5xl text-gray-400 text-center">
            Sepetinizde Ürün Yok
          </div>
          <Link to="/" className="flex flex-row mt-4 hover:text-blue-500">
            <p className="text-xl">Hemen Alışverişe Başlayın</p>
            <AiOutlineArrowRight className="ml-1 mt-1.5" size={18} />
          </Link>
        </div>
      ) : (
        <div class="h-screen bg-gray-50 pt-10">
          <h1 class="mb-10 text-center text-2xl font-bold">Sepetiniz</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3 max-h-[450px] overflow-y-scroll md:max-h-[750px]">
              {cartItems?.map((cartItem) => (
                <div
                  key={cartItem.id}
                  class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={cartItem.image}
                    alt="product"
                    class="w-full md:max-h-32 max-h-80 object-contain overflow-hidden rounded-lg sm:w-40"
                  />

                  <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                      <h2 class="text-lg font-bold text-gray-900">
                        {cartItem.title}
                      </h2>
                      <button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className="text-left text-sm text-red-700 pt-1"
                      >
                        Ürünü Sil
                      </button>
                    </div>
                    <div class="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div class="flex items-center border-gray-100">
                        <span
                          onClick={() => handleDecreaseCart(cartItem)}
                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          class="h-8 w-8 border bg-white text-right text-xs outline-none"
                          type="number"
                          value={cartItem.qty}
                          min="1"
                          disabled
                        />
                        <span
                          onClick={() => handleIncreaseCart(cartItem)}
                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div class="flex items-center space-x-4">
                        <p class="text-sm">
                          {" "}
                          {cartItem.price * cartItem.qty} ₺
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div class="mb-2 flex justify-between">
                <p class="text-gray-700">Ara Toplam</p>
                <p class="text-gray-700"> {cartTotal} ₺ </p>
              </div>
              <hr class="my-4" />
              <div class="flex justify-between">
                <p class="text-lg font-bold">Toplam</p>
                <div class="">
                  <p class="mb-1 text-lg font-bold"> {cartTotal} ₺ </p>
                </div>
              </div>
              <button onClick={() => navigate("/checkout-success")} class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Sipariş Ver
              </button>
              <button
                type="button"
                className="mt-2 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-700"
                onClick={() => handleClearCart()}
              >
                Sepeti Temizle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopCart;
