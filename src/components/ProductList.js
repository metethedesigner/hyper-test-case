import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import { getProductsRequest } from "../store/products/action";
import { addToCart } from "../store/cart/action";

const ProductList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const products = useSelector((state) => state.products.products) || [];
  const loading = useSelector((state) => state.products.loading);

  //Ürünleri çekmek için istek atıyoruz.
  useEffect(() => {
    dispatch(getProductsRequest());
  }, []);

  //Sepete ürün ekleme fonksiyonu
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} sepete eklendi!`);
  };

  //Çok uzun ürün isimlerini kısaltmak için fonksiyon
  const shortenTitle = (title) => {
    if (title?.length > 24) {
      return title.slice(0, 24) + "...";
    }
    return title;
  };

  // Ürün listesini her sayfaya 12 ürün gelecek şekilde düzenleyip, kaç sayfa olacağını hesaplıyoruz.
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="blue" loading={loading} size={150} />
        </div>
      ) : (
        <div id="products">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 auto-rows-auto gap-6">
            {currentItems?.map((product) => (
              <div key={product.id} className="shadow-lg rounded-lg">
                <div className="md:w-30 h-40 relative mx-auto">
                  <div className="h-full overflow-hidden rounded-md pt-4 pl-2">
                    <Link to={`/urun-detay/${product.id}`}>
                      <img
                        className="object-contain w-full h-full"
                        src={product.image}
                        alt="product1"
                      />
                    </Link>
                  </div>
                </div>
                <div className="p-3 flex flex-col h-44">
                  <div>
                    <div className="flex flex-row my-3">
                      <div className="text-lg text-blue-600">
                        {product.price}₺
                      </div>
                    </div>
                    <h3 className="min-h-[40px]">
                      <Link className="text-sm no-underline" to={`/urun-detay/${product.id}`}>
                        {shortenTitle(product.title)}
                      </Link>
                    </h3>
                  </div>
                  <button
                    className="mt-auto bg-blue-600 hover:bg-pink-950 rounded-2xl py-2 px-3 text-center text-gray-50 text-sm no-underline flex flex-row justify-center items-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <AiOutlineShoppingCart className="mr-1" />
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-8">
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
