
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaCheck,
  FaCheckDouble,
  FaUserPlus,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen,
  FaTimes,
} from "react-icons/fa";

import API from "../services/api";

const notificationIcons = {
  new_account: FaUserPlus,
  wishlist: FaHeart,
  cart: FaShoppingCart,
  new_order: FaBoxOpen,
};

const AdminNavbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dropdownRef = useRef(null);

  // ==========================================
  // FETCH NOTIFICATIONS
  // ==========================================

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await API.get("/notifications");
      const result = response.data;

      if (result.success) {
        setNotifications(
          Array.isArray(result.data) ? result.data : []
        );

        setUnreadCount(
          Number.isFinite(result.unreadCount)
            ? result.unreadCount
            : 0
        );

        setErrorMessage("");
      } else {
        setErrorMessage(
          result.message || "Unable to load notifications."
        );
      }
    } catch (error) {
      console.error(
        "Unable to fetch notifications:",
        error.response?.data?.message || error.message
      );

      setErrorMessage(
        error.response?.status === 401 ||
          error.response?.status === 403
          ? "Please log in with an authorized admin account."
          : "Unable to load notifications. Please try again."
      );
    }
  }, []);

  // ==========================================
  // INITIAL FETCH AND AUTOMATIC REFRESH
  // ==========================================

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ==========================================
  // TOGGLE NOTIFICATION DROPDOWN
  // ==========================================

  const handleToggleNotifications = () => {
    const nextState = !isOpen;

    setIsOpen(nextState);

    if (nextState) {
      fetchNotifications();
    }
  };

  // ==========================================
  // MARK ONE NOTIFICATION AS READ
  // ==========================================

  const handleMarkAsRead = async (notification) => {
    if (notification.isRead) return;

    try {
      const response = await API.patch(
        `/notifications/${notification._id}/read`
      );

      if (response.data.success) {
        setNotifications((previous) =>
          previous.map((item) =>
            item._id === notification._id
              ? { ...item, isRead: true }
              : item
          )
        );

        setUnreadCount((previous) => Math.max(0, previous - 1));
      }
    } catch (error) {
      console.error(
        "Unable to mark notification as read:",
        error.response?.data?.message || error.message
      );
    }
  };

  // ==========================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0 || loading) return;

    setLoading(true);

    try {
      const response = await API.patch("/notifications/read-all");

      if (response.data.success) {
        setNotifications((previous) =>
          previous.map((item) => ({
            ...item,
            isRead: true,
          }))
        );

        setUnreadCount(0);
      }
    } catch (error) {
      console.error(
        "Unable to mark all notifications as read:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FORMAT NOTIFICATION TIME
  // ==========================================

  const formatTime = (date) => {
    if (!date) return "";

    const timestamp = new Date(date).getTime();

    if (Number.isNaN(timestamp)) return "";

    const difference = Math.max(0, Date.now() - timestamp);
    const minutes = Math.floor(difference / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);

    if (days < 7) return `${days}d ago`;

    return new Date(date).toLocaleDateString();
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <header className="relative z-30 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3 shadow-sm sm:px-6 md:px-8">
      {/* Heading */}
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
          Admin Dashboard
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Search, Notifications and Profile */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5 md:gap-6">
        {/* Search */}
        <div className="hidden items-center rounded-full bg-gray-100 px-4 py-2 md:flex md:w-48 lg:w-80">
          <FaSearch className="shrink-0 text-gray-400" />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="ml-3 w-full min-w-0 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            aria-label={`Notifications, ${unreadCount} unread`}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={handleToggleNotifications}
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-[#6B1028] focus:outline-none focus:ring-2 focus:ring-[#6B1028]/30"
          >
            <FaBell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {isOpen && (
            <div className="fixed left-3 right-3 top-20 z-50 mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-3 sm:w-96">
              {/* Dropdown Header */}
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Notifications
                  </h3>

                  <p className="text-xs text-gray-500">
                    {unreadCount} unread
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      disabled={loading}
                      className="flex items-center gap-1 text-xs font-medium text-[#6B1028] hover:underline disabled:opacity-50"
                    >
                      <FaCheckDouble />

                      {loading ? "Updating..." : "Mark all read"}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close notifications"
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-[min(65vh,420px)] overflow-y-auto">
                {errorMessage ? (
                  <div className="px-5 py-8 text-center">
                    <FaBell className="mx-auto mb-3 text-2xl text-gray-300" />

                    <p className="text-sm text-red-600">
                      {errorMessage}
                    </p>

                    <button
                      type="button"
                      onClick={fetchNotifications}
                      className="mt-3 text-sm font-medium text-[#6B1028] hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <FaBell className="mx-auto mb-3 text-2xl text-gray-300" />

                    <p className="text-sm font-medium text-gray-600">
                      No notifications yet
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      New customer activity will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon =
                      notificationIcons[notification.type] || FaBell;

                    return (
                      <button
                        type="button"
                        key={notification._id}
                        onClick={() => handleMarkAsRead(notification)}
                        className={`flex w-full items-start gap-3 border-b border-gray-100 px-4 py-4 text-left transition hover:bg-gray-50 ${
                          notification.isRead
                            ? "bg-white"
                            : "bg-[#FCF5F6]"
                        }`}
                      >
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B1028]/10 text-[#6B1028]">
                          <Icon />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold text-gray-800">
                              {notification.title}
                            </span>

                            {!notification.isRead && (
                              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6B1028]" />
                            )}
                          </span>

                          <span className="mt-1 block break-words text-xs leading-5 text-gray-600">
                            {notification.message}
                          </span>

                          <span className="mt-2 block text-[11px] text-gray-400">
                            {formatTime(notification.createdAt)}
                          </span>
                        </span>

                        {!notification.isRead && (
                          <FaCheck
                            className="mt-1 shrink-0 text-xs text-gray-400"
                            title="Mark as read"
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="border-t bg-gray-50 px-4 py-3 text-center">
                <span className="text-xs text-gray-500">
                  Showing the latest {notifications.length} notifications
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FaUserCircle
            size={34}
            className="shrink-0 text-[#6B1028] sm:h-10 sm:w-10"
          />

          <div className="hidden lg:block">
            <h4 className="font-semibold text-gray-800">Admin</h4>

            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
