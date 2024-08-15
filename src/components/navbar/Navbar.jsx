import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/LOGO 1.png'
import { AuthContext } from "../../provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import toast from "react-hot-toast";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { user,setLoading } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const localTheme = localStorage.getItem("theme")
    console.log(localTheme);
    document.querySelector('html').setAttribute('data-theme', localTheme)
  }, [theme])

  const handleThemeToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const handleLogout = () => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful", {
          position: "top-right",
          duration: 2000,
          style: { width: "200px", height: "70px" },
        });
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout Successful", {
          position: "top-right",
          duration: 2000,
          style: { width: "200px", height: "70px" },
        });
      });
  };

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  const links = (
    <>
      <li><NavLink
        onClick={hamburger}
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "#000" : "#000",
        
          borderRadius: isActive ? '5px' : '',
          padding: isActive ? '5px 12px' : '',
          background: isActive ? "#1111111f" : "transparent",
        })}>Home</NavLink>
      </li>
   


    </>
  );



  return (
    <div>
      <nav className="bg-base-200 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
          {/* Left side website name and logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="w-24" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              VOLUNNET
            </span>
          </Link>

          {/* Right side Buttons */}
          <div className="flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">

            {
              !user && <div className={`md:block space-x-3 gap-4 hidden`}>
                <Link to="/login">
                  <button
                    type="button"
                    className="text-[#222] bg-[#FDDE55] hover:bg-[#ffd310] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </button>
                </Link>
              </div>
            }

            {
              user && <div
                className={`flex items-center space-x-3 gap-4`}
              >
                {
                  user && <div className="tooltip tooltip-left avatar cursor-pointer" data-tooltip-id="my-tooltip" data-tooltip-content={user?.displayName}>
                    <div className="w-12 rounded-full">
                      <img src={user?.photoURL} />
                    </div>
                  </div>
                }
                <Link
                  className="hidden md:flex"
                  onClick={handleLogout}
                  to="/login"
                >
                  <button
                    type="button"
                    className="text-white bg-[#FF6D60] hover:bg-[#ff988f] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Logout
                  </button>
                </Link>
              </div>
            }

            <div className="md:pl-8 md:block hidden ">
              <label className="cursor-pointer grid place-items-center">
                <input
                  onChange={handleThemeToggle}
                  checked={theme === 'light' ? false : true}
                  type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </label>
            </div>


            {/* Hamburger button */}
            <button
              onClick={handleHamburger}
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden text-white "
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Middle Part */}
          <div
            className="navbar items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-cta"
          >
            <ul className="menu menu-horizontal flex flex-col font-medium lg:p-0 border  rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 ">
              {links}
            </ul>
          </div>
        </div>

        {/* For Small device */}
        <div className={`lg:hidden fixed p-6 z-[99] duration-500 md:w-[50%] w-[70%] h-screen top-0 text-white bg-[#2D3250] ${hamburger ? "right-0" : "right-[-350px]  md:right-[-700px]"}`}>
          <button onClick={handleHamburger} className="text-2xl">
            <IoMdClose />
          </button>
          <div className="pt-8">
            <label className="swap swap-rotate">
              <input onChange={handleThemeToggle}
                checked={theme === 'light' ? false : true} type="checkbox" className="theme-controller" value="synthwave" />
              <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>
          </div>
          <ul className="font-semibold space-y-3 mt-6 ">{links}</ul>

          {
            !user && <div className={`md:hidden flex gap-4 mt-6`}>
              <Link onClick={handleHamburger} to="/login">
                <button
                  type="button"
                  className="text-[#111] bg-[#FDDE55] hover:bg-[#FDDE55] px-2 py-1 rounded-lg font-semibold"
                >
                  Login
                </button>
              </Link>

            </div>
          }
          {
            user && <div className={`md:hidden flex gap-4 mt-6`}>
              <Link
                onClick={() => {
                  handleHamburger();
                  handleLogout()
                }}
                to="/login"
              >
                <button
                  type="button"
                  className="text-[#111] bg-[#FDDE55] hover:bg-[#FDDE55] px-2 py-1 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </Link>
            </div>
          }

        </div>

      </nav>

      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default Navbar;
