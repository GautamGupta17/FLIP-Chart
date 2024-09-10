import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { backend_url } from '../../server';
import DropDown from './DropDown';
import Navbar from './Navbar';
import Cart from '../cart/Cart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';
import { productData, categoriesData } from "../../static/data";

const Header = ({ activeHeading }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`bg-[#2874f0] transition`}>
        {/* PC Header */}
        <div className="hidden 800px:flex items-center justify-between w-full h-[70px] px-4 lg:px-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt="Flipkart"
                className="h-6 mr-4"
              />
            </Link>
            <div className="relative" onClick={() => setDropDown(!dropDown)}>
              <div className="flex items-center text-white cursor-pointer">
                <span>All Categories</span>
                <IoIosArrowDown className="ml-2" />
              </div>
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>

          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-4 rounded-sm focus:outline-none"
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-3 top-2 cursor-pointer text-[#2874f0]"
            />
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] bg-white shadow-sm-2 z-[9] p-4 w-full">
                {searchData.map((i, index) => (
                  <Link key={index} to={`/product/${i._id}`}>
                    <div className="w-full flex items-start py-3">
                      <img
                        src={`${backend_url}${i.images[0]}`}
                        alt="img"
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.name}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className={`text-white px-4 py-2 rounded-sm cursor-pointer`}>
              <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                <h1 className="flex items-center">
                  {isSeller ? "Go Dashboard" : "Become Seller"}
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <div className="flex">
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff6161] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff6161] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="w-full h-[60px] fixed top-0 left-0 z-50 bg-[#2874f0] shadow-sm 800px:hidden">
          <div className="w-full flex items-center justify-between px-4">
            <div>
              <BiMenuAltLeft
                size={40}
                color="#fff"
                onClick={() => setOpen(true)}
              />
            </div>
            <div>
              <Link to="/">
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                  alt="Flipkart"
                  className="h-6 mt-3"
                />
              </Link>
            </div>
            <div>
              <div
                className="relative mr-[20px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={30} color="#fff" />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff6161] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile sidebar */}
          {open && (
            <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
              <div className="fixed w-[70%] bg-white h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full flex justify-between pr-3">
                  <div>
                    <div
                      className="relative mr-[15px]"
                      onClick={() => setOpenWishlist(true) || setOpen(false)}
                    >
                      <AiOutlineHeart size={30} className="mt-5 ml-3" />
                      <span className="absolute right-0 top-0 rounded-full bg-[#ff6161] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {wishlist && wishlist.length}
                      </span>
                    </div>
                  </div>
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <div className="my-8 w-[92%] m-auto h-[40px relative]">
                  <input
                    type="search"
                    placeholder="Search for products"
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {/* Add search results here */}
                </div>

                <Navbar active={activeHeading} />
                <div className="text-white px-4 py-2 rounded-sm cursor-pointer bg-[#2874f0] m-4">
                  <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                    <h1 className="flex items-center">
                      {isSeller ? "Go Dashboard" : "Become Seller"}
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
                <br />
                <br />
                <br />

                <div className="flex w-full justify-center">
                  {isAuthenticated ? (
                    <div>
                      <Link to="/profile">
                        <img
                          src={`${backend_url}${user.avatar}`}
                          alt="Profile img"
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-[18px] pr-[10px] text-[#000000b7]"
                      >
                        Login
                      </Link>
                      <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* cart popup */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* wishlist popup */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;