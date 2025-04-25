import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { fetchNotificationHistory } from "../../redux/actions/notificationActions";

const Navbar: React.FC = () => {
  const { userDTO } = useAppSelector((state: RootState) => state.auth);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const notificationArray=useAppSelector((state: RootState) => state.notifications.list);
  const notificationCount = notificationArray.length;

  const notifications = [
    { id: 1, text: "New message from Alice: 'Let's finalize the design mockups'", read: false },
    { id: 2, text: "Payment received from Bob: $150 for project completion", read: true },
    { id: 3, text: "Group chat updated: 3 new messages in 'Design Team'", read: false },
  ];

  useEffect(() => {
    dispatch(fetchNotificationHistory());
  }, [dispatch]);

  //handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userDTO");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
  }
  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="bg-gradient-to-b from-amber-50 to-transparent px-6 py-4 backdrop-blur-sm relative z-40">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <span className="text-2xl font-playfair text-amber-900">Chatty</span>
          <span className="text-amber-700 text-xl">✉️</span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 hover:bg-amber-100/50 rounded-full transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-6 h-6 text-amber-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-amber-50 border border-amber-200 rounded-lg shadow-paper z-50">
                <div className="p-3 font-playfair text-lg text-amber-900 border-b border-amber-200">
                  Notifications
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notificationArray.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 text-base font-crimson transition-colors ${
                          !notification.read ? "bg-amber-100/50" : "bg-transparent"
                        } hover:bg-amber-100 border-b border-amber-100 last:border-b-0`}
                      >
                        <div className="flex items-center space-x-3">
                          {!notification.read && (
                            <div className="w-3 h-3 bg-amber-600 rounded-full flex-shrink-0" />
                          )}
                          <span className={!notification.read ? "text-amber-900" : "text-amber-700/80"}>
                            {notification.text}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-amber-700/80 text-base font-crimson">
                      No new messages
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile + Logout */}
          <div className="flex items-center space-x-3">
            <button className="hover:bg-amber-100/50 rounded-full transition-colors">
              {userDTO?.profilePic ? (
                <img
                  src={userDTO.profilePic}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-amber-200"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-amber-700" />
                </div>
              )}
            </button>
            <span className="font-crimson text-amber-900 text-base hidden md:block">
              {userDTO?.username}
            </span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm px-3 py-1 rounded-lg font-semibold font-crimson transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
