import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../../redux/hooks";
import { fetchUsersBySearch } from "../../utility/fetchUsers";
import { UserDTO } from "../../interfaces/types";

interface SideBarHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const SideBarHeader: React.FC<SideBarHeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userResults, setUserResults] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {token,userDTO} = useAppSelector((state) => state.auth);
  const currentUserEmail = userDTO?.email;
  if (!token || !currentUserEmail) {
    return <div className="text-amber-700">Please log in to go further.</div>;
  }

  // Effect to fetch users based on search term
  useEffect(() => {
    const searchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const users = await fetchUsersBySearch(searchTerm, token);
        

        // Filter out current user from results
        const filteredUsers = users.filter(user => 
          user.email?.toLowerCase() !== currentUserEmail?.toLowerCase()
        );
        
        setUserResults(filteredUsers);
      } catch (err) {
        setError("Failed to search users. Please try again.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
  
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim() && token) {
        searchUsers();
      } else {
        setUserResults([]);
      }
    }, 300);
  
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, token]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSearchTerm("");
    setUserResults([]);
    setError("");
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8 border-b border-amber-900/20 pb-4">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl tracking-wide font-playfair font-bold text-amber-900"
        >
          Chatty
          <span className="text-amber-700 text-2xl ml-2">🕊️</span>
        </motion.h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="paper-button p-2"
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-amber-700" />
            ) : (
              <MoonIcon className="w-6 h-6 text-amber-700" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="paper-button"
            onClick={() => setShowAddModal(true)}
          >
            <PlusCircleIcon className="w-7 h-7 text-amber-700" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="paper-container w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-playfair text-amber-900">
                  Add New Contact
                </h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={handleCloseModal}
                  className="paper-button p-2 hover:bg-amber-100/50 text-amber-700"
                >
                  ✕
                </motion.button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="paper-input pl-12 pr-4 py-3 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700/80" />
                </motion.div>
              </div>

              {/* Results Section */}
              <motion.div
                className="space-y-3 max-h-64 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center py-4"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700" />
                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <p className="text-red-600 font-crimson">{error}</p>
                  </motion.div>
                ) : userResults.length > 0 ? (
                  userResults.map((user, index) => (
                    <motion.div
                      key={user.user_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 hover:bg-amber-100/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-200 flex items-center justify-center"
                        >
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={user.username}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <UserCircleIcon className="w-6 h-6 text-amber-700" />
                          )}
                        </motion.div>
                        <div>
                          <p className="font-crimson text-amber-900">
                            {user.username}
                          </p>
                          <p className="text-sm text-amber-700/80">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="paper-button px-3 py-1 text-sm hover:bg-amber-200/50"
                      >
                        Add
                      </motion.button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <p className="text-amber-700/80 font-crimson">
                      {searchTerm.trim()
                        ? `No users found matching "${searchTerm}"`
                        : "Start typing to search users"}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBarHeader;
