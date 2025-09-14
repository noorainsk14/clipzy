"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  //const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration Failed");
      }

      router.push("/login");
    } catch (error) {
      console.log(error)
      setError("Something went wrong");
    }
  };

  return <div className="flex justify-center mt-30 px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
    <fieldset className="fieldset bg-base-400 border-base-600 rounded-box w-full max-w-md border p-6">
  <legend className="fieldset-legend text-2xl">Register</legend>

  <label className="label">Email</label>
  <input 
   type="email"
   className="input" 
   placeholder="Email" 
   value={email}
   onChange={(e) => setEmail(e.target.value)}
   />

  <label className="label">Password</label>
  <input 
  type="password" 
  className="input" 
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)} 
  />

  <label className="label"> Confirm Password</label>
  <input 
  type="password" 
  className="input" 
  placeholder="Confirm Password" 
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

  <button  className="btn btn-neutral mt-4" type="submit">Register</button>
</fieldset>
<p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
</form>
  </div>;
};

export default Register;
