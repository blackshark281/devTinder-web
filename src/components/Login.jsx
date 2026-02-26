import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID:</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;

// import axios from 'axios';
// import React, { useState } from 'react'
// import { addUser } from '../utils/userSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {BASE_URL} from '../utils/constant';

// const Login = () => {

//     const [emailId, setEmailId] = useState("rohit.sharma@gmail.com");
//     const [password, setPassword] = useState("rohit@123");
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const handleLogin = async () =>{
//         try{
//             const res = await axios.post(BASE_URL + "/login", 
//             {emailId, password}, {withCredentials: true}
//             );
//             dispatch(addUser(res.data));
//             navigate("/");
//         }catch(err){
//             setError(err.response?.data || "Login failed");
//         }
//     }

//   return (
//     <div className="flex justify-center my-25">
//         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
//         <legend className="fieldset-legend">Login</legend>

//         <label className="label">Email</label>
//         <input type="email" value={emailId} className="input" placeholder="Email" 
//         onChange={(e) => setEmailId(e.target.value)}/>

//         <label className="label">Password</label>
//         <input type="password" value={password} className="input" placeholder="Password" 
//         onChange={(e) => setPassword(e.target.value)}/>

//         <p className="text-error mt-2">{error}</p>
//         <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
//         </fieldset>
//     </div>
//   )
// }

// export default Login