import { Paper, Avatar, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {isAuthenticated} = useSelector((state) => state.auth);
  const naviagte = useNavigate();
  const { userDTO } = useSelector((state) => state.auth);

  const getUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Token not found");

      return;
    }

    //TODO[DONE] create a dto for users list, password also getting fetched.
    try {
      const res = await axios.get("http://localhost:8080/allUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    } else {
      naviagte("/auth");
    }
  }, [isAuthenticated, naviagte]);


  return (
    <div className="bg-gray-50 shadow-md h-screen flex flex-col">
      <div className="pt-4 font-bold text-xl sm:text-2xl text-[#002D74] text-center border-b border-gray-200">
        <h2>Friends</h2>
      </div>
      <div className="flex items-center p-4 border-b border-gray-300">
        <input
          type="text"
          placeholder="Search"
          className="ml-0 p-1 w-full sm:w-80 h-8 rounded-xl bg-gray-100 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaMagnifyingGlass className="text-gray-500 w-6 h-6 ml-4 cursor-pointer" />
      </div>

      <div className="overflow-y-auto flex-grow">
        {users
          .filter((user) => user.user_id !== userDTO.user_id)
          .filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div className="mt-3 px-2 sm:px-3" key={user.user_id}>
              <Link
                to="/ChatLayout"
                className="block text-gray-700 hover:scale-105 duration-300"
                state={{
                  id: user.user_id,
                  username: user.username,
                  profile_image: user ?.profile_image,
                }}
              >
                <Paper elevation={0} sx={{ border: "2px solid #3d85c6" }}>
                  <List>
                    <ListItem>
                      <Avatar src={user.profile_image} />
                      <ListItemText
                        primary={user.username}
                        sx={{ marginLeft: "8px" }}
                        className="block text-sm sm:text-base"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
//TODO[DONE]: write searching logic for to find the chats.
