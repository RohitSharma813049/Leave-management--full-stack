import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GiThreeLeaves } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../store/authSlice";
import Loader from "../components/Loader";

function LeaveLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((s) => s.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  console.log("LeaveLayout - user:", user);
  console.log("LeaveLayout - token:", token);
  console.log("LeaveLayout - loading:", loading);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (token && !user) dispatch(fetchMe());
    if (!token) navigate("/login");
  }, [dispatch, token, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading || !user) return <Loader text="Loading your dashboard..." size="large" />;

  const isManager = user.role === "manager";  // ROLE FIX
  const base = isManager ? "/manager" : "/employee";

  const nav = isManager
    ? [
        { link: `${base}`, icon: MdOutlineDashboard, label: "Dashboard" },
        { link: `${base}/viewleave`, icon: GiThreeLeaves, label: "View Leave" },
        { link: `${base}/leavehistory`, icon: FaHistory, label: "Leave History" },
        { link: `${base}/profile`, icon: CgProfile, label: "Profile" },
      ]
    : [
        { link: `${base}`, icon: MdOutlineDashboard, label: "Dashboard" },
        { link: `${base}/leaveapply`, icon: GiThreeLeaves, label: "Apply Leave" },
        { link: `${base}/leavehistory`, icon: FaHistory, label: "Leave History" },
        { link: `${base}/profile`, icon: CgProfile, label: "Profile" },
      ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full bg-blue-500 text-white w-64 transform transition-transform duration-300  
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static`}
      >
        <div className="flex justify-center items-center h-[10%] mt-4 mb-6 gap-3 px-2">
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
            <GiThreeLeaves className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-white font-bold leading-5 text-center">
            My Leave <br /> Management
          </p>
        </div>
        <ul className="list-none">
          {nav.map((navItem, index) => (
            <Link key={index} to={navItem.link}>
              <li
                className={`p-2 hover:bg-blue-950 flex gap-2 cursor-pointer ${
                  location.pathname === navItem.link ? "bg-blue-900" : ""
                }`}
              >
                <navItem.icon className="mt-1" />
                {navItem.label}
              </li>
            </Link>
          ))}
          <li className="p-2 hover:bg-blue-950 flex gap-2 cursor-pointer" onClick={handleLogout}>
            <IoLogOutOutline className="mt-1" />
            Logout
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main */}
      <div className="flex-1 p-4 ml-0 w-full">
        <button
          className="text-2xl mb-4 text-blue-600 lg:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <RxCross2 /> : <GiHamburgerMenu />}
        </button>

        <div className="bg-white rounded shadow p-4 h-full overflow-auto w-full">
          <div className="text-2xl font-bold mb-4 flex items-center justify-end gap-4">
            <div className="md:text-xl">Welcome {user.name}</div>
            <Link to={`${base}/profile`}>
              <CgProfile className="text-3xl text-blue-700 cursor-pointer" />
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LeaveLayout;
