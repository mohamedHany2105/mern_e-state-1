import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/store/userSlice.js";
export default function SignIn() {
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      <h1 className="text-center mx-auto text-4xl">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 my-10 justify-between items-center w-[70%] shadow-lg p-3 mx-auto"
      >
        <input
          onChange={handleChange}
          type="email"
          id="email"
          placeholder="email"
          className="p-3 bg-gray-200 w-[50%] mx-auto rounded-2xl  my-3"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="password"
          className="p-3  bg-gray-200 w-[50%] mx-auto  my-3 rounded-2xl"
        />
        <button className=" bg-gray-900 rounded-2xl hover:bg-gray-700  w-[50%] text-white p-3 mx-auto">
          {loading?"Loading":"Sign In"}
        </button>
      </form>

      <p className="text-gray-900 text-2xl text-center">
        Have an Account ?
        <Link className="text-green-600" to="/signup">
          sign up
        </Link>
      </p>
      {error && <p className="text-red-500 text-2xl text-center">{error}</p>}
    </div>
  );
}
