import React from "react";

//Components
import Hero from "../components/hero";
import ProductList from "../components/ProductList";
import SortBy from "../components/left-section/sortBy";
import Categories from "../components/left-section/categories";
import MiniCart from "../components/right-section/cart";
import TotalPrice from "../components/right-section/totalPrice";

import { Grid, useMediaQuery, useTheme } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <Hero />
      <Grid container spacing={6} columns={12}>
        <Grid item xs={12} sm={12} md={12} lg={2} style={{ minWidth: "220px" }}>
          <SortBy />
          <Categories />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={7}>
          {isSmallScreen && (
            <>
              <MiniCart />
              <TotalPrice />
            </>
          )}
          <ProductList />
        </Grid>
        {!isSmallScreen && (
          <Grid item xs={12} md={12} lg={3}>
            <MiniCart />
            <TotalPrice />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Home;
