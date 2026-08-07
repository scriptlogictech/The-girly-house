import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/styles/logo.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMobileMenu(false);
    navigate("/");
  };

  return (
    <>
      <header className={`tgh-navbar ${isSticky ? "tgh-navbar--sticky" : ""}`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex h-20 items-center justify-between px-5 ">
            <Link to="/" className="tgh-brand select-none">
              <img
                src={logo}
                alt="The Girly House by Manisha"
                className="tgh-logo"
              />
            </Link>

            <nav className="hidden items-center gap-10 lg:flex">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `tgh-navlink font-medium ${isActive ? "tgh-navlink--active" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <button className="tgh-icon-btn">
                <FiSearch size={21} />
              </button>

              <Link to="/wishlist" className="tgh-icon-btn relative">
                <FiHeart size={21} />
                {wishlistCount > 0 && (
                  <span className="tgh-badge">{wishlistCount}</span>
                )}
              </Link>

              <Link to="/cart" className="tgh-icon-btn relative">
                <FiShoppingBag size={21} />
                {cartCount > 0 && (
                  <span className="tgh-badge">{cartCount}</span>
                )}
              </Link>

              <div className="relative" ref={userMenuRef}>
                {!isAuthenticated ? (
                  <Link to="/login" className="tgh-icon-btn">
                    <FiUser size={21} />
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2"
                    >
                      <div className="tgh-avatar">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <FiChevronDown className="hidden text-gray-500 lg:block" />
                    </button>

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
                          onClick={() => setShowUserMenu(false)}
                          className="tgh-dropdown__item"
                        >
                          My Profile
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="tgh-dropdown__item"
                        >
                          My Orders
                        </Link>

                        <Link
                          to="/wishlist"
                          onClick={() => setShowUserMenu(false)}
                          className="tgh-dropdown__item"
                        >
                          Wishlist
                        </Link>

                        <button
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

              <button
                className="tgh-icon-btn lg:hidden"
                onClick={() => setMobileMenu(true)}
              >
                <FiMenu size={25} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`tgh-mobile-panel ${mobileMenu ? "tgh-mobile-panel--open" : ""}`}>
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h2 className="text-xl font-semibold text-gray-900">Menu</h2>

          <button onClick={() => setMobileMenu(false)} className="tgh-icon-btn">
            <FiX size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenu(false)}
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

          <NavLink
            to="/wishlist"
            onClick={() => setMobileMenu(false)}
            className="flex items-center justify-between text-gray-700"
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="tgh-badge tgh-badge--static">
                {wishlistCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setMobileMenu(false)}
            className="flex items-center justify-between text-gray-700"
          >
            Cart
            {cartCount > 0 && (
              <span className="tgh-badge tgh-badge--static">
                {cartCount}
              </span>
            )}
          </NavLink>

          {!isAuthenticated ? (
            <NavLink to="/login" onClick={() => setMobileMenu(false)} className="text-gray-700">
              Login
            </NavLink>
          ) : (
            <>
              <div className="rounded-lg bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <NavLink to="/profile" onClick={() => setMobileMenu(false)} className="text-gray-700">
                Profile
              </NavLink>

              <NavLink to="/orders" onClick={() => setMobileMenu(false)} className="text-gray-700">
                My Orders
              </NavLink>

              <button onClick={handleLogout} className="text-left text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
        />
      )}

      {isSticky && <div className="h-20" />}
    </>
  );
};

export default Navbar;