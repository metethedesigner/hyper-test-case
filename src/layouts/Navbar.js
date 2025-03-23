import React, { useCallback, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Logo from "../assets/images/hyper-logo.png";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import {
  resetProductsToOriginal,
  updateFiltersAndSort,
} from "../store/products/action";
import { Search, SearchIconWrapper, StyledInputBase } from "./NavbarStyles";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart?.cartTotalAmount);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  //Kişi yazmayı bıraktığında arama isteği atması için debounce kütüphanesini kullanıyoruz.
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query === "") {
        dispatch(resetProductsToOriginal());
      } else {
        dispatch(updateFiltersAndSort({ searchQuery: query }));
      }
    }, 500),
    [dispatch]
  );

  const toggleNavbar = () => {
    // Mobil menü butonuna tıklandığında navbarOpen durumunu değiştiriyoruz.
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="mb-20">
      <nav class="bg-blue-600 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" class="flex items-center">
            <img src={Logo} class="h-12 mr-3" alt="Logo" />
          </Link>
          <div class="flex md:order-2">
            <div className="flex">
              <FaUser
                size={16}
                fill="#fff"
                className="mt-2 mr-1 hidden md:block"
              />
              <span className="text-white mt-2 mr-4 hidden md:block font-semibold text-sm">
                Mete
              </span>
            </div>

            <Link
              type="button"
              class="text-white mx-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 hidden md:inline-block"
              to="/sepet"
            >
              <AiOutlineShoppingCart size={21} className="inline-block mr-1" />
              {cartTotal} ₺
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              onClick={() => toggleNavbar()}
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              navbarOpen ? "flex" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <Search>
              <SearchIconWrapper>
                <IoIosSearch />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleSearchChange}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
