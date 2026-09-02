import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

import logo from "../../assets/styles/logo.jpeg";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // ==========================================
  // Contexts
  // ==========================================

  const { cart } = useCart();

  const { wishlistCount } = useWishlist();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  // ==========================================
  // Counts
  // ==========================================

  const cartCount = cart?.totalItems || 0;

  // ==========================================
  // State
  // ==========================================

  const [isSticky, setIsSticky] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  // Search
  const [showSearch, setShowSearch] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  // ==========================================
  // Refs
  // ==========================================

  const userMenuRef = useRef(null);

  const searchRef = useRef(null);

  const searchInputRef = useRef(null);

  // ==========================================
  // Sticky Navbar
  // ==========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 30);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ==========================================
  // Close User Menu
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(
          event.target
        )
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==========================================
  // Open Search
  // ==========================================

  const openSearch = () => {
    setShowSearch(true);

    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  // ==========================================
  // Close Search
  // ==========================================

  const closeSearch = () => {
    setShowSearch(false);
    setSearchValue("");
  };

  // ==========================================
  // Search Submit
  // ==========================================

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) {
      return;
    }

    navigate(
      `/shop?search=${encodeURIComponent(value)}`
    );

    closeSearch();
    setMobileMenu(false);
  };

  // ==========================================
  // Search Keydown
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }

      // "/" shortcut
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          document.activeElement?.tagName
        )
      ) {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ==========================================
  // Close Search On Outside Click
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(
          event.target
        )
      ) {
        closeSearch();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [showSearch]);

  // ==========================================
  // Navigation Links
  // ==========================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    logout();

    setShowUserMenu(false);
    setMobileMenu(false);

    navigate("/");
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <>
      {/* ========================================
          DESKTOP / MAIN NAVBAR
      ======================================== */}

      <header
        className={`tgh-navbar ${
          isSticky
            ? "tgh-navbar--sticky"
            : ""
        }`}
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex h-20 items-center justify-between px-5">

            {/* ==================================
                LOGO
            ================================== */}

            <Link
              to="/"
              className="tgh-brand select-none"
            >
              <img
                src={logo}
                alt="The Girly House by Manisha"
                className="tgh-logo"
              />
            </Link>


            {/* ==================================
                DESKTOP NAVIGATION
            ================================== */}

            <nav className="hidden items-center gap-10 lg:flex">

              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `tgh-navlink font-medium ${
                      isActive
                        ? "tgh-navlink--active"
                        : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

            </nav>


            {/* ==================================
                RIGHT SIDE ICONS
            ================================== */}

            <div className="flex items-center gap-5">

              {/* ==================================
                  SEARCH
              ================================== */}

              <button
                type="button"
                className="tgh-icon-btn"
                onClick={openSearch}
                aria-label="Search"
              >
                <FiSearch size={21} />
              </button>


              {/* ==================================
                  WISHLIST
              ================================== */}

              <Link
                to="/wishlist"
                className="tgh-icon-btn relative"
                aria-label="Wishlist"
              >
                <FiHeart size={21} />

                {wishlistCount > 0 && (
                  <span className="tgh-badge">
                    {wishlistCount}
                  </span>
                )}
              </Link>


              {/* ==================================
                  CART
              ================================== */}

              <Link
                to="/cart"
                className="tgh-icon-btn relative"
                aria-label="Cart"
              >
                <FiShoppingBag size={21} />

                {cartCount > 0 && (
                  <span className="tgh-badge">
                    {cartCount}
                  </span>
                )}
              </Link>


              {/* ==================================
                  USER
              ================================== */}

              <div
                className="relative"
                ref={userMenuRef}
              >

                {!isAuthenticated ? (

                  <Link
                    to="/login"
                    className="tgh-icon-btn"
                    aria-label="Login"
                  >
                    <FiUser size={21} />
                  </Link>

                ) : (

                  <>
                    {/* User Button */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowUserMenu(
                          !showUserMenu
                        )
                      }
                      className="flex items-center gap-2"
                    >
                      <div className="tgh-avatar">
                        {user?.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <FiChevronDown
                        className="hidden text-gray-500 lg:block"
                      />
                    </button>


                    {/* User Dropdown */}

                    {showUserMenu && (
                      <div className="tgh-dropdown">

                        <div className="tgh-dropdown__header">

                          <h3 className="font-semibold text-gray-900">
                            {user?.name}
                          </h3>

                          <p className="truncate text-sm text-gray-500">
                            {user?.email}
                          </p>

                        </div>


                        <Link
                          to="/profile"
                          onClick={() =>
                            setShowUserMenu(false)
                          }
                          className="tgh-dropdown__item"
                        >
                          My Profile
                        </Link>


                        <Link
                          to="/orders"
                          onClick={() =>
                            setShowUserMenu(false)
                          }
                          className="tgh-dropdown__item"
                        >
                          My Orders
                        </Link>


                        <Link
                          to="/wishlist"
                          onClick={() =>
                            setShowUserMenu(false)
                          }
                          className="tgh-dropdown__item"
                        >
                          Wishlist
                        </Link>


                        <button
                          type="button"
                          onClick={handleLogout}
                          className="tgh-dropdown__item tgh-dropdown__item--danger"
                        >
                          Logout
                        </button>

                      </div>
                    )}

                  </>

                )}

              </div>


              {/* ==================================
                  MOBILE MENU BUTTON
              ================================== */}

              <button
                type="button"
                className="tgh-icon-btn lg:hidden"
                onClick={() =>
                  setMobileMenu(true)
                }
                aria-label="Open menu"
              >
                <FiMenu size={25} />
              </button>

            </div>

          </div>

        </div>
      </header>


      {/* ========================================
          SEARCH OVERLAY
      ======================================== */}

      {showSearch && (
        <div className="tgh-search-overlay">

          <div
            className="tgh-search-box"
            ref={searchRef}
          >

            <form
              onSubmit={handleSearchSubmit}
              className="tgh-search-form"
            >

              <FiSearch
                className="tgh-search-form-icon"
              />

              <input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(
                    event.target.value
                  )
                }
                placeholder="Search products, styles..."
                autoComplete="off"
                aria-label="Search products"
              />

              {searchValue && (
                <button
                  type="button"
                  className="tgh-search-clear"
                  onClick={() =>
                    setSearchValue("")
                  }
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}

              <button
                type="submit"
                className="tgh-search-submit"
                disabled={!searchValue.trim()}
              >
                <span>Search</span>
                <FiArrowRight />
              </button>

            </form>


            {/* Search Suggestions */}

            {!searchValue.trim() && (
              <div className="tgh-search-suggestions">

                <p className="tgh-search-label">
                  POPULAR SEARCHES
                </p>

                <div className="tgh-search-tags">

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("Kurti")
                    }
                  >
                    Kurti
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("Saree")
                    }
                  >
                    Saree
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("Suit")
                    }
                  >
                    Suit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("Dress")
                    }
                  >
                    Dress
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setSearchValue("Co-ord")
                    }
                  >
                    Co-ord
                  </button>

                </div>

              </div>
            )}

            {searchValue.trim() && (
              <div className="tgh-search-result-hint">

                <span>
                  Press Enter to search for
                </span>

                <strong>
                  "{searchValue.trim()}"
                </strong>

              </div>
            )}

            <div className="tgh-search-footer">

              <span>
                Press <kbd>ESC</kbd> to close
              </span>

              <span className="tgh-search-shortcut">
                <kbd>/</kbd> Search
              </span>

            </div>

          </div>

        </div>
      )}


      {/* ========================================
          MOBILE MENU
      ======================================== */}

      <div
        className={`tgh-mobile-panel ${
          mobileMenu
            ? "tgh-mobile-panel--open"
            : ""
        }`}
      >

        {/* Mobile Header */}

        <div className="flex items-center justify-between border-b border-gray-100 p-5">

          <h2 className="text-xl font-semibold text-gray-900">
            Menu
          </h2>

          <button
            type="button"
            onClick={() =>
              setMobileMenu(false)
            }
            className="tgh-icon-btn"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>

        </div>


        {/* Mobile Navigation */}

        <div className="flex flex-col gap-6 p-6">

          {/* Mobile Search */}

          <button
            type="button"
            className="tgh-mobile-search-trigger"
            onClick={() => {
              setMobileMenu(false);
              openSearch();
            }}
          >
            <FiSearch />

            <span>
              Search products...
            </span>

            <FiArrowRight />
          </button>


          {/* Main Links */}

          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() =>
                setMobileMenu(false)
              }
              className={({ isActive }) =>
                `text-lg ${
                  isActive
                    ? "font-semibold text-[var(--primary)]"
                    : "text-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}


          {/* Wishlist */}

          <NavLink
            to="/wishlist"
            onClick={() =>
              setMobileMenu(false)
            }
            className="flex items-center justify-between text-gray-700"
          >
            <span>Wishlist</span>

            {wishlistCount > 0 && (
              <span className="tgh-badge tgh-badge--static">
                {wishlistCount}
              </span>
            )}
          </NavLink>


          {/* Cart */}

          <NavLink
            to="/cart"
            onClick={() =>
              setMobileMenu(false)
            }
            className="flex items-center justify-between text-gray-700"
          >
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="tgh-badge tgh-badge--static">
                {cartCount}
              </span>
            )}
          </NavLink>


          {/* User */}

          {!isAuthenticated ? (

            <NavLink
              to="/login"
              onClick={() =>
                setMobileMenu(false)
              }
              className="text-gray-700"
            >
              Login
            </NavLink>

          ) : (

            <>

              <div className="rounded-lg bg-gray-50 p-4">

                <h3 className="font-semibold text-gray-900">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

              </div>


              <NavLink
                to="/profile"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700"
              >
                Profile
              </NavLink>


              <NavLink
                to="/orders"
                onClick={() =>
                  setMobileMenu(false)
                }
                className="text-gray-700"
              >
                My Orders
              </NavLink>


              <button
                type="button"
                onClick={handleLogout}
                className="text-left text-red-600"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>


      {/* ========================================
          MOBILE OVERLAY
      ======================================== */}

      {mobileMenu && (
        <div
          onClick={() =>
            setMobileMenu(false)
          }
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}


      {/* Sticky Spacer */}

      {isSticky && (
        <div className="h-20" />
      )}

    </>
  );
};

export default Navbar;