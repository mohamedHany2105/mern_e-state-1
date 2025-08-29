import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import supabase from '../supabase'
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/store/userSlice";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser.user.id);
  console.log(currentUser);
  console.log(currentUser.img_profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser.user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
      }
      dispatch(signOutUserSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser.user.id}`,
        {
          method: "DELETE",

          body: JSON.stringify(),
        }
      );
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSuccess(data));
      navigate("/signin");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = async () => {
    if (!file) return;
    const filename = `${Date.now()}-${file.name} `;
    console.log(file.name);

    const { data, error } = await supabase.storage
      .from("img")
      .upload(filename, file);
    console.log(data);
    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      <h1 className="text-center mx-auto text-4xl">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 my-10 justify-between items-center w-[70%] shadow-lg p-3 mx-auto"
      >
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        />
        <img
          onChange={handleFileUpload}
          onClick={() => fileRef.current.click()}
          src={currentUser.user.img_profile}
          alt={currentUser.user.name}
          className="rounded-full"
        />

        <input
          defaultValue={currentUser.user.name}
          onChange={handleChange}
          type="text"
          id="name"
          placeholder="name"
          className="p-3 bg-gray-200 w-[50%] mx-auto  my-3 rounded-2xl"
        />
        <input
          defaultValue={currentUser.user.email}
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
          {loading ? "Loading" : "update"}
        </button>
        <button
          onClick={handleSignOut}
          className=" bg-green-900 rounded-2xl hover:bg-gray-700  w-[50%] text-white p-3 mx-auto"
        >
          {loading ? "Loading" : "Sign Out"}
        </button>
        <button
          onClick={handleDeleteAccount}
          className=" bg-red-900 rounded-2xl hover:bg-gray-700  w-[50%] text-white p-3 mx-auto"
        >
          {loading ? "Loading" : "Delete Account"}
        </button>
      </form>

      <p className="text-center text-red-500 text-xl">{error}</p>
      {error && <p className="text-2xl text-red-500 text-center">{error}</p>}
    </div>
  );
}
