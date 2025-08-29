import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-10 p-3 bg-gray-800 w-full">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/">
          <div className="text-2xl p-2 text-center">
            <span className="text-gray-200 ">Mohamed</span>
            <span className="text-gray-300"> Hany</span>
          </div>
        </Link>
        <button
          className="sm:hidden text-white text-2xl p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>
      </div>

      <form className="bg-gray-50 flex gap-2 justify-between items-center rounded-xl p-2 w-full sm:w-auto mt-2 sm:mt-0">
        <input
          type="text"
          name="search"
          placeholder="search ..."
          className="outline-none flex-1 min-w-0 bg-gray-50"
          id="search"
        />
        <FaSearch />
      </form>

      <ul
        className={`flex-col sm:flex-row flex sm:flex gap-4 sm:gap-10 items-center text-white text-xl px-3 mt-2 sm:mt-0 ${
          menuOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <li className="hover:underline">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link to="/about">About</Link>
        </li>

        {currentUser ? (
          <li>
            <Link to="/profile">
              <img
                src={currentUser.user.img_profile}
                className="rounded-full h-7 w-7 object-cover "
                alt={currentUser.user.name}
              />
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </header>
  );
}
