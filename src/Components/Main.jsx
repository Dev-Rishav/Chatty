import React, { useEffect} from "react";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { useSelector } from "react-redux";
import axios from "axios";

const Main = () => {
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (loading) {
      return <div>Loading...</div>;
    }
  }, [loading]);


  // debugging
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/greet", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          // withCredentials: true, // Added withCredentials
        });
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Home />
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
