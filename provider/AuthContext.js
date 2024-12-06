import { USER_INFO } from "config/constant";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    let userData = null;
    const cookie = cookies.find((row) =>
      row.startsWith("X-Local-Storage-Data=")
    );
    if (cookie && cookie != "") {
      userData = cookie.split("=")[1];
    }
    if (userData != "''" && userData != null) {
      setLoggedIn(true);
      setUserInfo(JSON.parse(userData));
    } else {
      setLoggedIn(false);
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/signin", "/signup"];
    const cookies = document.cookie.split("; ");
    let userData = null;
    const cookie = cookies.find((row) =>
      row.startsWith("X-Local-Storage-Data=")
    );
    if (cookie && cookie != "") {
      userData = cookie.split("=")[1];
    }
    if (userData != "''" && userData != null) {
      const userInfo = JSON.parse(userData);
      setLoggedIn(true);
      setUserInfo(userInfo);
      const roleArray = userInfo["roles"];

      if (!roleArray.find((item) => item.url == router.pathname)) {
        if (!router.pathname == "/dashboard") {
          router.push("/");
        }
      }
    } else {
      setLoggedIn(false);
      setUserInfo(null);
      if (router.pathname == "/signin" || router.pathname == "/signup") {
      } else {
        router.push("/signin");
      }
      // if (router.pathname != "/") {
      //   if (!protectedRoutes.some((route) => router.pathname.includes(route))) {
      //   }
      // }
    }
  }, [router.pathname]);

  const isDynamicRoute = (path) => {
    const dynamicPattern = /^\/(stream|category|event|detail)\/\d+$/; // Matches /stream/, /category/, or /event/ followed by any number
    const dynamicWithIdPattern = /^\/(stream|category|event|detail)\/\[\w+\]$/;
    return dynamicPattern.test(path) || dynamicWithIdPattern.test(path);
  };

  const login = (user) => {
    setLoggedIn(true);
    setUserInfo(user);
    const daysUntilExpire = 1;
    const date = new Date();
    date.setTime(date.getTime() + daysUntilExpire * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();

    document.cookie = "isLoggedIn=true; " + expires + "; path=/";
    document.cookie = `X-Local-Storage-Data=${JSON.stringify(
      user
    )}; ${expires}; path=/`;
    document.cookie = `expiresAt=${date.getTime()}; ${expires}; path=/`;
    router.push("/");
  };

  const checkCookieExpiration = () => {
    const expiresAtCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("expiresAt="));
    const expiresAt = expiresAtCookie
      ? parseInt(expiresAtCookie.split("=")[1])
      : null;

    if (expiresAt && new Date().getTime() > expiresAt) {
      logout();
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUserInfo(null);
    document.cookie = "isLoggedIn=false;path=/";
    document.cookie = `X-Local-Storage-Data='';path=/`;
    document.cookie = "expiresAt='';path=/";
    document.cookie = "";
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        userInfo,
        login,
        logout,
        checkCookieExpiration,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
