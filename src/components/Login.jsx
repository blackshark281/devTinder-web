import axios from 'axios';
import React, { useState } from 'react'
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../utils/constant';

const Login = () => {

    const [emailId, setEmailId] = useState("rohit.sharma@gmail.com");
    const [password, setPassword] = useState("rohit@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () =>{
        try{
            const res = await axios.post(BASE_URL + "/login", 
            {emailId, password}, {withCredentials: true}
            );
            dispatch(addUser(res.data));
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="flex justify-center my-25">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" value={emailId} className="input" placeholder="Email" 
        onChange={(e) => setEmailId(e.target.value)}/>

        <label className="label">Password</label>
        <input type="password" value={password} className="input" placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}/>

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
        </fieldset>
    </div>
  )
}

export default Login