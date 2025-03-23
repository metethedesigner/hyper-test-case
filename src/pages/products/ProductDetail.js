import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cart/action";
import { toast } from "react-toastify";
import MiniCart from "../../components/right-section/cart";
import TotalPrice from "../../components/right-section/totalPrice";
import { Grid, styled, Tooltip, Typography } from "@mui/material";
import { getProductsRequest } from "../../store/products/action";

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%", 
  maxWidth: 470, 
  maxHeight: 450, 
  display: "flex",
  objectFit: "contain", 
  borderRadius: theme.shape.borderRadius, 
  [theme.breakpoints.up("lg")]: {
    width: "100%", 
  },
}));

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);

  // productId'ye uygun ürünü filtrele
  const selectedProduct = products?.find((p) => p.id === Number(id));

  //Store da ürün yüklü değilse istek atacak fonksiyon
  useEffect(() => {
    if (!selectedProduct && !products?.length) {
      dispatch(getProductsRequest());
    }
  }, [dispatch, selectedProduct, products]);

  //Sepete ekleme fonksiyonu
  const handleAddToCart = (selectedProduct) => {
    dispatch(addToCart(selectedProduct));
    toast.success(`${selectedProduct.title} sepete eklendi!`);
  };

  //Çok uzun gelen açıklama içeriğini ilk 350 karakteri alarak sonuna ... ekleyecek şekilde düzenliyoruz.
  const getDescription = (description) => {
    if (description?.length > 350) {
      return `${description.substring(0, 350)}...`;
    }
    return description;
  };

  return (
    <>
      <Grid className="px-5 py-24 mx-auto" container spacing={4}>
        <Grid item xs={12} md={8}>
          <div>
            <div class="lg:w-4/5 flex flex-wrap justify-center items-center">
              <ProductImage alt="product" src={selectedProduct?.image} />
              <div class="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                  {selectedProduct?.title}
                </h1>

                <Tooltip
                  title={selectedProduct?.description || ""}
                  placement="top"
                  arrow
                >
                  <Typography className="leading-relaxed">
                    {getDescription(selectedProduct?.description)}
                  </Typography>
                </Tooltip>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div class="flex">
                  <span class="title-font font-medium text-2xl text-gray-900">
                    {selectedProduct?.price} ₺
                  </span>
                  <button
                    class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <MiniCart />
          <TotalPrice />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetail;
