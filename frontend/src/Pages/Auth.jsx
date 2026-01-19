import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Bg from "../assets/bg.png"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'



function Auth() {
   const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  

  function LoginForm() {

  const [formData , setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const HandleSubmit = async(e) =>{
    e.preventDefault();
   
    console.log('Login Data:', formData);
    for(let key in formData) {
      if(formData[key] === '') {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await axios.post(`http://localhost:9000/api/user/login`, formData , 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
      })
      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials.");
    }
  }
  
   
    return (
     <form action="" onSubmit={HandleSubmit}>
       <div className="form-group flex flex-col mt-6 items-center">
        <h3 className="text-xl font-bold text-white">Login Form</h3>

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
          className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
        />

        <button className="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">
          Login
        </button>
        <p className="mt-2 text-white">Don`t have an account? <span className="text-blue-300 cursor-pointer" onClick={() => setIsLogin(false)}>Register</span></p>
      </div>
     </form>
    )
  }

 function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);

    for(let key in formData) {
      if(formData[key] === '') {
        toast.error(`Please fill in the ${key} field.`);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
  toast.error("Passwords do not match");
  return;
}


    try {
      const response = await axios.post('http://localhost:9000/api/user/register', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

  return (
    <form action="" onSubmit={HandleSubmit}>
      <div className="form-group flex flex-col mt-6 items-center">
      <h3 className="text-xl font-bold text-white">Register Form</h3>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mt-4 p-2 rounded-lg bg-white/20 text-white outline-none w-full"
      />

      <button className="mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full">
        Register
      </button>
       <p className="mt-2 text-white">Already have an account? <span className="text-blue-300 cursor-pointer" onClick={() => setIsLogin(true)}>Login</span></p>
    </div>
    </form>
  );
}


  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-[520px] w-[380px] bg-black/10 backdrop-blur-md rounded-lg shadow-lg flex flex-col p-4">
        {/* Tabs */}
        <div className="flex justify-between mt-3">
          <h6
            onClick={() => setIsLogin(true)}
            className={`text-xl font-bold p-2 rounded-xl ml-7 cursor-pointer transition
              ${isLogin ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-300"}`}
          >
            Login
          </h6>

          <h6
            onClick={() => setIsLogin(false)}
            className={`text-xl font-bold p-2 rounded-xl mr-7 cursor-pointer transition
              ${!isLogin ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-300"}`}
          >
            Register
          </h6>
        </div>

        {/* Render Form */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default Auth