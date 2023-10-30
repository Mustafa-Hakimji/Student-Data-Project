import React, { createContext, useContext, useEffect, useState } from "react";

const Provider = createContext();

const ContextProvider = ({ children }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("login"))
  );

  const showToast = (message, reason) => {
    setToastMsg(message);

    reason === "danger"
      ? setToastColor("#FA6042")
      : reason === "add"
      ? setToastColor("#2FBE6E")
      : reason === "info"
      ? setToastColor("#35B8BF")
      : setToastColor("");

    setToastVisible(true);
  };

  const contextValue = {
    schoolName: "Little Angels School",
    setIsSearch,
    isSearch,
    searchText,
    setSearchText,
    userData,
    setUserData,
    isLogin,
    setIsLogin,
    toastVisible,
    toastMsg,
    setToastVisible,
    toastColor,
    showToast,
  };

  return <Provider.Provider value={contextValue}>{children}</Provider.Provider>;
};

export const useContextHook = () => useContext(Provider);

export default ContextProvider;
