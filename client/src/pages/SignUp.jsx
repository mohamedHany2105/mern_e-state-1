import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message || "Sign up failed");
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate("/signin");

    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      <h1 className="text-center mx-auto text-4xl">Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 my-10 justify-between items-center w-[70%] shadow-lg p-3 mx-auto"
      >
        <input
          onChange={handleChange}
          type="text"
          id="name"
          placeholder="name"
          className="p-3 bg-gray-200 w-[50%] mx-auto  my-3 rounded-2xl"
        />
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
        {
          loading?"Loading":"Sign up"

        }  
        </button>
      </form>

      <p className="text-gray-900 text-2xl text-center">
        Don't have an account ?
        <Link className="text-green-600" to="/signin">
          sign in
        </Link>
      </p>

<p className="text-center text-red-500 text-xl"> 
  {error}
</p>

    </div>
  );
}
