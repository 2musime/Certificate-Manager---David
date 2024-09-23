import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";
import Home from "../icons/home";
import Menu from "../icons/menu";
import Down from "../icons/down";
import { useLanguage } from "./context/LanguageContext";
// import { useUser } from "./context/UserContext";

interface MenuItem {
  title: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { title: "Example 1", path: "/example1" },
  { title: "Example 2", path: "/example2" },
  { title: "Example 3", path: "/example3" },
];

const Sidebar: React.FC = () => {
  const { translations } = useLanguage();
  // const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleStartClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleDropdownClick = useCallback(() => {
    setShowDropdown(!showDropdown);
    setIsExpanded(!isExpanded);
  }, [showDropdown, isExpanded]);

  const handleItemClick = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="sidebar">
      <div className="menu-item" onClick={handleStartClick}>
        <Home /> {translations['start']}
      </div>
      <div className="menu-item" onClick={handleDropdownClick}>
        <Menu /> {translations['machinelearning']}
        <Down className={`downicon ${isExpanded ? "rotated" : ""}`} />
      </div>
      {showDropdown && (
        <div className="dropdown">
          {menuItems.map((item: MenuItem) => (
            <div
              key={item.title}
              className="dropdown-item"
              onClick={() => handleItemClick(item.path)}
            >
              {translations[item.title.toLowerCase().replace(/ /g, '')]}
            </div>
          ))}
        </div>
      )}
      {/* <div className="signed-user">
        Signed user: {user}
      </div> */}
    </div>
  );
};

export default Sidebar;



