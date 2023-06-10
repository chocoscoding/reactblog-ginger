import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Usercontext";
const Navbar = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userinfo, setUserinfo, profileFetcher } = useUser();
  useEffect(() => {
    const timeout = setTimeout(() => {
      profileFetcher();
    }, 150);
    return () => clearTimeout(timeout);
  }, []);

  const logout = async () => {
    try {
      const apiCall = await fetch(`${apiUrl}/logout`, {
        credentials: "include",
        method: "POST",
      });
      if (apiCall.ok) {
        setUserinfo(null);
        navigate(0);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  return (
    <nav className="flex justify-between items-center h-[3rem] w-full mb-8">
      <Link to="/">
        <text className="logo">TB</text>
      </Link>
      <div className="flex w-auto gap-4 md:gap-9">
        {userinfo?.username ? (
          <>
            <Link to="/create" className="text-lg md:text-2xl">
              Create a post
            </Link>
            <p className="text-lg md:text-2xl" onClick={logout}>
              {`Logout (${userinfo.username})`}
            </p>
          </>
        ) : (
          <>
            <Link to="/register" className="text-lg md:text-2xl">
              Register
            </Link>
            <Link to="/login" className="text-lg md:text-2xl">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
